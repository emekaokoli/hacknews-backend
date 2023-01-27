const createError = require('http-errors');

const {
  findItemsByType,
  thirdPartyPosts,
} = require('../services/news.service');

const getNewsHandlerByType = async (req, res, next) => {
  const DEFAULT_CATEGORY = 'top';
  const {
    category = DEFAULT_CATEGORY,
    page: _page,
    limit: _limit,
  } = req.query;

  try {
    const page = parseInt(_page || 1);
    const limit = parseInt(_limit || 30);
    const skip = (page - 1) * limit;

    const { totalRecord, results } = await findItemsByType(
      category,
      skip,
      limit
    );

    const pages = Math.ceil(totalRecord / limit);
    const prevPage = page > 1 ? page - 1 : undefined;
    const nextPage = page + 1;

    return res.status(200).json({
      success: true,
      totalRecord,
      pages,
      prevPage,
      nextPage,
      data: page <= pages ? results : [],
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

module.exports = {
  getNewsHandlerByType,
  thirdPartyPostHandler,
};
