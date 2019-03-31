const moment = require('moment');

const formatDuration = duration => {
  if(duration === undefined) {
    return '00:00';
  } else {
    return moment.utc(duration * 1000).format('mm:ss');
  }
};

export { formatDuration };
