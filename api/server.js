const express = require("express");
const helmet = require("helmet");
const authRouter = require("./auth/auth-router");


const server = express();

server.use(helmet()); //  web uygulamalarını çeşitli güvenlik saldırılarına karşı korur.
server.use(express.json());


server.use("/api/auth", authRouter);

module.exports = server;
