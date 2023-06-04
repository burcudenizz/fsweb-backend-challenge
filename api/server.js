const express = require("express");
const helmet = require("helmet");
const authRouter = require("./auth/auth-router");
const tweetsRouter = require("./tweets/tweets-router");

const server = express();

server.use(helmet()); //  web uygulamalarını çeşitli güvenlik saldırılarına karşı korur.
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/tweets", tweetsRouter);

module.exports = server;
