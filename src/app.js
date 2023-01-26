const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const consola = require('consola')
const { connectDB } = require('./utils/db.connect.utils')

connectDB()
  .then(() => consola.info(`database connected!!!`))
  .catch((error) => consola.error(error.message));

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/news', require('./routes/news.routes'))

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(404);
});

app.use((err, req, res, next) =>
  res.status(err.statusCode || 500).send({
    success: false,
    message: err.stack,
  })
);

module.exports = app;