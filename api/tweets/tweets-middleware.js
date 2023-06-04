const { JWT_SECRET } = require("../secrets"); // bu secreti kullanın!
const jwt = require("jsonwebtoken");

//tokenın varlığını ve doğruluğunu kontrol eder.
const sinirli = (req, res, next) => {
  try {
    let authHeader = req.headers["authorization"]; // req.headers.authorization
    if (!authHeader) {
      res.status(401).json({ message: "Token gereklidir" });
    } else {
      jwt.verify(authHeader, JWT_SECRET, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: "token gecersizdir" });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { sinirli };
