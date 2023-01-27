const fetch = require('node-fetch');
const sample = require('lodash/sample');
const chunk = require('lodash/chunk');
const { postNews } = require('../services/news.service');
const consola = require('consola');

const name = 'fetch random posts';
const durationInMinutes = 5;
const NUMBER_OF_NEW_POSTS_TO_SYNC = 100;
const BATCH_SIZE = 20;

async function getLatestPostIds(type, number) {
  const ids = await fetch(
    `https://hacker-news.firebaseio.com/v0/${type}stories.json?print=pretty&orderBy="$key"&limitToFirst=${number}`
  );

  return await ids.json();
}

async function getPost(id) {
  const post = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );

  return await post.json();
}

async function savePostsToDB(posts, type) {
  const postsToCreate = posts.map((post) => ({
    ...post,
    category: type,
  }));
  await postNews(postsToCreate);
}

async function getPosts(postIds) {
  return await Promise.all(postIds.map((id) => getPost(id)));
}

async function callback() {
  consola.info(`Starting job ${name} @ ${new Date()}`);
  // pick a random type
  const type = sample(['new', 'top', 'best']);

  // fetch all new postIds of this type
  const postIds = await getLatestPostIds(
    type,
    NUMBER_OF_NEW_POSTS_TO_SYNC
  );
  const batches = chunk(postIds, BATCH_SIZE);

  for (let batch of batches) {
    // fetch posts
    const posts = await getPosts(batch);

    // save posts to the DB
    await savePostsToDB(posts, type);
  }
  consola.info(`Completed job ${name} @ ${new Date()}`);
}

module.exports = {
  name,
  callback,
  durationInMinutes,
};
