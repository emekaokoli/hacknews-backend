const createError = require('http-errors');

const { newsSchema } = require('../schema/news.schema');

exports.validateEntity = (req, res, next) => {
  const { error } = newsSchema.validate(req.body);
  if (error) {
    return next(createError.BadRequest(error.details[0].message));
  }
  return next();
};
