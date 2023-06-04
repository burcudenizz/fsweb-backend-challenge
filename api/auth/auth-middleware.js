const tweetModel = require("../tweets/tweets-model.js");
const bcrypt = require("bcryptjs");

const usernameVarmi = async (req, res, next) => {
  try {
    let isExist = await tweetModel.getUserById(req.body.owner_id);
    if (isExist && isExist.length > 0) {
      let currentUser = isExist[0];
      let isPasswordMatch = bcrypt.compareSync(
        req.body.password,
        currentUser.password
      );
      if (!isPasswordMatch) {
        res.status(401).json({
          message: "Geçersiz kriter",
        });
      } else {
        req.currentUser = currentUser;
        next();
      }
    } else {
      res.status(401).json({
        message: "Geçersiz kriter",
      });
    }
  } catch (error) {
    next(error);
  }
};

const checkPayload = (req, res, next) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ messsage: "Eksik alan var" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  usernameVarmi,
  checkPayload,
};
