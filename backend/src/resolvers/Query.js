const { forwardTo } = require('prisma-binding');
const { checkPermissions } = require('../permissions');

const Query = {
  song: forwardTo('db'),
  songs: forwardTo('db'),
  songsConnection: forwardTo('db'),
  user: forwardTo('db'),
  usersConnection: forwardTo('db'),
  currentUser(parent, args, ctx, info) {
    if(!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user({
      where: { id: ctx.request.userId },
    }, info);
  },
  async users(parent, args, ctx, info) {
    // if(!ctx.request.userId) {
    //   throw new Error('You must be logged in to view other users.');
    // }
    console.log(ctx.request.userId);
    // checkPermissions(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
    return ctx.db.query.users({}, info);
  },
}

module.exports = Query;
