const express = require('express');
const {
  postNewsHandler,
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
  .post(validateEntity, postNewsHandler);

router.route('/articles').post(validateEntity, thirdPartyPostHandler);

module.exports = router;
