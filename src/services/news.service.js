const { NewsModel } = require('../models/news.model');

const postNews = async (posts) =>
  await Promise.all(
    posts.map((post) =>
      NewsModel.updateOne({ id: post.id }, post, { upsert: true })
    )
  );

const findItemsByType = async (category, skip, limit) => {
  const results = await NewsModel.find({ category }).sort({_id:-1}).skip(skip).limit(limit)
  const totalRecord = await NewsModel.find({ category }).count();
   return {
    results,
    totalRecord
   } 
};

const thirdPartyPosts = async (post) => await NewsModel.create(post);

module.exports = {
  postNews,
  findItemsByType,
  thirdPartyPosts,
};
