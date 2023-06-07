const router = require("express").Router();
const authMw = require("./auth-middleware");
const { JWT_SECRET } = require("../secrets");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tweetModel = require("../tweets/tweets-model");
const tweetMw = require("../tweets/tweets-middleware");
router.post(
  "/register",
  authMw.checkPayload,
  authMw.checkDuplicateEmail,
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

router.post(
  "/login",
  authMw.checkPayload,
  authMw.isUserExist,
  async (req, res, next) => {
    try {
      let payload = {
        owner_name: req.currentUser.owner_name,
        email: req.currentUser.email,
        id: req.currentUser.owner_id,
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
      res.status(200).json({
        message: `${req.currentUser.owner_name} geri geldi`,
        token: token,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/users", tweetMw.sinirli, async (req, res, next) => {
  try {
    const users = await tweetModel.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post("/logout", tweetMw.sinirli, (req, res, next) => {
  try {
    const expirationTime = 1;
    res.cookie("token", "", { expires: new Date(Date.now() - expirationTime) });
    res.json({
      message: "Çıkış yapıldı!",
      logout: true,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/profile", tweetMw.sinirli, async (req, res, next) => {
  try {
    const ownerEmail = req.decodedToken.email;
    const user = await tweetModel.getUserByEmail(ownerEmail);
    res.json(user);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
