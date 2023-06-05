const router = require("express").Router();
const tweetModel = require("./tweets-model.js");
const tweetMw = require("./tweets-middleware.js");

router.get("/", tweetMw.sinirli, (req, res, next) => {
  tweetModel
    .getAllTweets()
    .then((tweet) => {
      res.json(tweet);
    })
    .catch(next);
});

router.get("/:owner_id", tweetMw.sinirli, (req, res, next) => {
  tweetModel
    .getTweetsById(req.params.owner_id)
    .then((tweet) => {
      res.json(tweet);
    })
    .catch(next);
});

router.post("/post",tweetMw.checkPayload, async (req, res, next) => {
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
