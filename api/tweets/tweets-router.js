const router = require("express").Router();
const tweetModel = require("./tweets-model.js");
const tweetMw = require("./tweets-middleware.js");
const { sign } = require("jsonwebtoken");

router.get("/", tweetMw.sinirli, async (req, res, next) => {
  try {
    const tweet = await tweetModel.getAllTweets();
    res.json(tweet);
  } catch (error) {
    next(error);
  }
});

router.get("/:owner_id", tweetMw.sinirli, async (req, res, next) => {
  try {
    const tweet = await tweetModel.getTweetsById(req.params.owner_id);
    res.json(tweet);
  } catch (error) {
    next(error);
  }
});

router.post("/post", tweetMw.checkTweetPayload, tweetMw.sinirli,async (req, res, next) => {
  try {
    let modelTweet = {
      owner_id: req.body.owner_id,
      owner_name: req.body.owner_name,
      body: req.body.body,
      img_url: req.body.img_url,
    };

    const insertedTweet = await tweetModel.createTweet(modelTweet);
    res.status(201).json(insertedTweet);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
