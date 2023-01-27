const { ToadScheduler, SimpleIntervalJob, AsyncTask } = require('toad-scheduler')
const consola = require('consola')

/**
 * 
 * @param { name: string, callback: Function, durationInMinutes: number } jobs 
 */
function scheduleAsync(jobs) {
  const scheduler = new ToadScheduler();

  for (const job of jobs) {
    const task = new AsyncTask(
      job.name,
      job.callback,
      (err) => consola.error(`An error occurred processing job [${job.name}]. Err: ${err.message}`)
    );
    const simpleJob = new SimpleIntervalJob(
      { minutes: job.durationInMinutes },
      task,
      { preventOverrun: true }
    );

    scheduler.addIntervalJob(simpleJob);

    return scheduler;
  }
}

module.exports = { scheduleAsync }
