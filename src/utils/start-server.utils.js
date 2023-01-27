const env = require('dotenv').config();
const app = require('../app');
const http = require('http');
const consola = require('consola');

const { scheduleJobs } = require('../jobs');

const scheduler = scheduleJobs();

const startServer = async () => {
  try {
    const port = process.env.PORT || '6000';

    const server = http.createServer(app);

    server.listen(port, () =>
      consola.info(`[hackernews-api] Listening on ${port}`)
    );
  } catch (error) {
    consola.error(error.message);
    scheduler.stop();
    process.exit();
  }
};

startServer();

module.exports = startServer;
