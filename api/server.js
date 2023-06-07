const express = require("express");
const helmet = require("helmet");
const authRouter = require("./auth/auth-router");
const tweetsRouter = require("./tweets/tweets-router");

const server = express();

server.use(helmet()); //  web uygulamalarını çeşitli güvenlik saldırılarına karşı korur.
server.use(express.json());
server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // Tüm kaynaklara erişime izin verir (Dikkat: Güvenlik riski oluşturabilir)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // İzin verilen HTTP yöntemleri
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // İzin verilen başlıklar
    next();
  });
server.use("/api/auth", authRouter);
server.use("/api/tweets", tweetsRouter);

//4. Error middleware

server.use((err,req,res,next)=>{
  res.status(err.status || 500)
      .json({
          message: err.message || "Server Error!..."
      })
})



module.exports = server;
