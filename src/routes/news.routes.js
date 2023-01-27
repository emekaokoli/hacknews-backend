const express = require('express');
const {
  getNewsHandlerByType,
  thirdPartyPostHandler,
} = require('../controllers/news.controller');
const router = express.Router();

const {
  validateEntity,
} = require('../middleware/validate.routes.middleware');

router
  .route('/')
  .get(getNewsHandlerByType)
  .post(validateEntity, thirdPartyPostHandler);

module.exports = router;
