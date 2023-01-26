const Joi = require('joi');

exports.newsSchema = Joi.object().keys({
  id: Joi.number().required().messages({
    'number.base': 'id must be a number',
    'number.required': 'id is required',
  }),
  delete: Joi.boolean().optional().default(false),
  type: Joi.string().required().messages({
    'string.base': 'type must be a string',
    'string.required': 'type is required',
  }),
  by: Joi.string().optional(),
  time: Joi.number().optional(),
  dead: Joi.boolean().optional().default(false),
  kids: Joi.array().required().optional(),
  descendants: Joi.number().optional(),
  score: Joi.number().optional(),
  title: Joi.string().optional(),
  url: Joi.string()
    .optional()
    .default('http://www.spotlight.io/prism/'),
});
