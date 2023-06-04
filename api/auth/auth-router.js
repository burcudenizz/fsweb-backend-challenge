const router = require("express").Router();
const authMw = require("./auth-middleware");
const { JWT_SECRET } = require("../secrets");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tweetModel = require("../tweets/tweets-model");

router.post(
  "/register",
  async (req, res, next) => {
    try {
      let hashedPassword = bcrypt.hashSync(req.body.password);
      let modelUser = {
        owner_name: req.body.owner_name,
        email: req.body.email,
        password: hashedPassword,
      };

      const registeredUser = await tweetModel.createUser(modelUser);
      res.status(201).json(registeredUser);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/login",
authMw.checkPayload,
authMw.usernameVarmi, async (req, res, next) => {
  try {
    let payload = {
      owner_name: req.currentUser.owner_name,
      email: req.currentUser.email,
      subject: req.currentUser.owner_id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({
      message: `${req.currentUser.owner_name} geri geldi`,
      token: token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
