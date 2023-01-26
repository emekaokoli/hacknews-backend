const fetch = require('node-fetch');
const _ = require('lodash');

const {
  validateEntity,
} = require('../middleware/validate.routes.middleware');
const { postNews } = require('../services/news.service');

const requestPost = async (id) => {
  const fetchedNews = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );
  return await fetchedNews.json();
};

const randomTypes = () => {
  const types = ['new', 'top', 'best'];
  const randomIndex = Math.floor(Math.random() * types.length);
  return types[randomIndex];
};

const fetchDataEvery5minutes = async (type = randomTypes()) => {
  // the api stopped accepting frenquent requests, throws a timeout error so I had to split it in chunks of I'ds but 100 fetch
  const news = await fetch(
    `https://hacker-news.firebaseio.com/v0/${type}stories.json?print=pretty&orderBy="$key"&limitToFirst=100`
  );
  const postIds = await news.json();
  // to mitigate blocking frequent requests
  const idChunks = _.chunk(postIds, 100);
  for (const idChunk of idChunks) {
    const postsToCreate = idChunk.map((id) => requestPost(id));
    const postsJson = await Promise.all(postsToCreate);
    savePostsToDB(postsJson, type);
  }
};

const savePostsToDB = async (posts, type) => {
  const postsToCreate = posts.map((post) => {
    return { ...post, category: type };
  });
  postNews(postsToCreate);
};

function schedulePostsSync() {
  return setInterval(fetchDataEvery5minutes, 300000);
}

function getStories(type) {
  return fetchDataEvery5minutes(type);
}

module.exports = {
  schedulePostsSync,
  getStories,
};
