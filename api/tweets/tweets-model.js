const db = require("../../data/db-config");

/*tweets */

function getAllTweets() {
  return db("tweets");
}

function getTweetsById(owner_id) {
  return db("tweets").where("owner_id", owner_id);
}

async function createTweet(tweet) {
  const [insertedId] = await db("tweets").insert(tweet);
  const inserted = await db("tweets").where("id", insertedId).first();
  return inserted;
}

function removeTweet(id_tweet) {
  return db("tweets").where("id", Number(id_tweet)).del();
}

/*users */

function getAllUsers() {
  return db("users");
}

async function createUser({ owner_name, password, email }) {
  let created_user_id;
  await db.transaction(async (trx) => {
    const [userInserted_id] = await trx("users").insert({
      owner_name,
      password,
      email,
    });
    created_user_id = userInserted_id;
  });
  return getUserById(created_user_id);
}

function getUserById(owner_id) {
  return db("users").where("owner_id", owner_id).first();
}

async function getUserByEmail(filtre) {
  return db("users").select().where("email", filtre);
}

module.exports = {
  getAllTweets,
  getTweetsById,
  createTweet,
  removeTweet,
  createUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
};
