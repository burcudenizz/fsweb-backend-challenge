const tweetModel = require("../tweets/tweets-model.js");
const bcrypt = require("bcryptjs");
const db = require("../../data/db-config.js");

const isUserExist = async (req, res, next) => {
  try {
    let isExist = await tweetModel.getUserByEmail(req.body.email);
    if (isExist && isExist.length > 0) {
      let currentUser = isExist[0];
      let isPasswordMatch = bcrypt.compareSync(
        req.body.password,
        currentUser.password
      );
      if (!isPasswordMatch) {
        res.status(401).json({
          message: "Parola veya email hatalı..",
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

const checkDuplicateEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    const existingUser = await db("users").where({ email }).first();
    if (existingUser) {
      return res.status(409).json({ error: "Bu email zaten kullanılıyor." });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const checkPayload = (req, res, next) => {
  try {
    let {  email, password } = req.body;
    if ( !email || !password) {
      res.status(400).json({ messsage: "Girdiğiniz alanları kontrol ediniz!" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isUserExist,
  checkPayload,
  checkDuplicateEmail,
};
