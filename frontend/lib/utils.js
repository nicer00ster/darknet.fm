const moment = require('moment');

const formatDuration = duration => {
  return moment.utc(duration * 1000).format('mm:ss');
};

export { formatDuration };
