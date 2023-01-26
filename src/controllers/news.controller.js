const createError = require('http-errors');

const {
  postNews,
  findItemsByType,
  thirdPartyPosts,
} = require('../services/news.service');
const { getStories } = require('../utils/schedulePostSync.util');



const getNewsHandlerByType = async (req, res, next) => {
  const { category } = req.query;

  try {
    const page = parseInt(req.query.page || 0);
    const limit = parseInt(req.query.limit || 30);
    const skip = parseInt(page * limit);

    const {totalRecord, results} = await findItemsByType(category, skip, limit);
  
    const pages = Math.ceil(totalRecord / limit);
    const prevPage = parseInt(page - 1);
    const nextPage = parseInt(page + 1);

    if (page > pages) {
      return next(createError.NotFound('Page not found'));
    }

    return res.status(200).json({
      success: true,
      totalRecord,
      pages,
      prevPage,
      nextPage,
      data: results,
    });
  } catch (error) {
    return next(error);
  }
};

async function thirdPartyPostHandler(req, res, next) {
  const { title, score, url, time, type, by, kids } = req.body;

  try {
    const results = await thirdPartyPosts({
      title,
      score,
      url,
      time,
      type,
      by,
      kids,
    });
    return res.status(201).send({
      success: true,
      results,
    });
  } catch (error) {
    return next(error);
  }
}

async function postNewsHandler(req, res, next) {
  const { type } = req.params;
  try {
    await getStories(type);

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  postNewsHandler,
  getNewsHandlerByType,
  thirdPartyPostHandler,
};
