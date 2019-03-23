const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, emailTemplate } = require('../mail');

const Mutations = {
  async createUser(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser({
      data: {
        ...args,
        password,
        permissions: { set: ['USER'] },
      },
    }, info);

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    });

    return user;
  },
  async login(parent, { email, password }, ctx, info) {
    // 1. check if there is a user with that email
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // 2. Check if their password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid Password!');
    }
    // 3. generate the JWT Token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 4. Set the cookie with the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    // 5. Return the user
    return user;
  },
  logout(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return { message: 'Later! 🞛' };
  },
  async requestReset(parent, args, ctx, info) {
    const user = await ctx.db.query.user({
      where: { email: args.email },
    });
    if(!user) {
      throw new Error(`No user in database with email: ${args.email}`);
    }
    const bytes = promisify(randomBytes);
    const resetToken = (await bytes(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000;
    const res = await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry }
    });
    const mailResponse = await transport.sendMail({
      from: 'darknet@fm.com',
      to: user.email,
      subject: 'DARKNET.FM || Password Reset Token',
      html: emailTemplate(`Follow this link to reset your password! \n\n
        <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Reset Password</a>`),
    });

    return { message: 'A token has been sent to your email.' };
  },
  async resetPassword(parent, args, ctx, info) {
    if(args.password !== args.confirmPassword) {
      throw new Error('The password\'s do not match.');
    }
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000,
      },
    });
    if(!user) {
      throw new Error('Token is either invalid or has expired.');
    }
    const password = await bcrypt.hash(args.password, 10);
    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    return updatedUser;
  },
  toast(parent, args, ctx, info) {
    let message = args.message;
    let error = args.error;
    return {
      message,
      error,
    }
  },
  async createSong(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that.');
    }
    if(!args.song) {
      throw new Error('You must upload a song before submitting.');
    }
    if(!args.image) {
      throw new Error('You must upload an image before submitting.');
    }
    if(!args.artist) {
      throw new Error('Please provide an artist before submitting.');
    }
    if(!args.title) {
      throw new Error('Please provide a title for your song.');
    }
    if(!args.description) {
      throw new Error('Please provide a description before submitting.');
    }
    if(args.tags.length <= 0) {
      throw new Error('Give your song a few tags.');
    }
    const song = await ctx.db.mutation.createSong({
      data: {
        artist: args.artist,
        title: args.title,
        description: args.description,
        song: args.song,
        image: args.image,
        tags: {
          set: args.tags,
        },
        // This is how to create a relationship between the Item and the User
        user: {
          connect: {
            id: ctx.request.userId,
          },
        },
      },
    }, info);

    return song;
  },
  async uploadAvatar(parent, args, ctx, info) {
    const [user] = await ctx.db.query.users({
      where: {
        email: args.email,
      },
    });
    if(!user) {
      throw new Error('No user exists.');
    }
    const updatedUser = await ctx.db.mutation.updateUser({
      where: {
        email: user.email,
      },
      data: {
        avatar: args.avatar,
      },
    });
    return updatedUser;
  },
}

module.exports = Mutations;
