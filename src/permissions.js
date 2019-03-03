function checkPermissions(user, required) {
  const match = user.permissions.filter(permission => {
    required.includes(permission);
  });
  if(!match.length) {
    throw new Error(`You don\'t have the required permissions.`)
  }
}

exports.checkPermissions = checkPermissions;
