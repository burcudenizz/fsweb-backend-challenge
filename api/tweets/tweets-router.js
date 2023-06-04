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

module.exports = router;
