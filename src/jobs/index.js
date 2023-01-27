const { name, durationInMinutes, callback } = require('./fetchPosts');
const { scheduleAsync } = require('./scheduler');

function scheduleJobs() {
  return scheduleAsync([
    {
      name,
      durationInMinutes,
      callback,
    }
  ]);
}

module.exports = { scheduleJobs }
