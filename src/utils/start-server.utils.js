const app = require('../app');
const env = require('dotenv').config();
const http = require('http');
const consola = require('consola');

const {schedulePostsSync} = require('../utils/schedulePostSync.util');

schedulePostsSync();


const startServer = async () => {
  try {
    const port = process.env.PORT || '6000';

    const server = http.createServer(app);

    server.listen(port, () =>
      consola.info(`[hackernews-api] Listening on ${port}`)
    );
  } catch (error) {
    consola.error(error.message);
    process.exit();
  }
};

startServer();

module.exports = startServer;
