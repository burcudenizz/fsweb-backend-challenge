const express = require("express");
const helmet = require("helmet");

const server = express();

server.use(helmet()); //  web uygulamalarını çeşitli güvenlik saldırılarına karşı korur.
server.use(express.json());

module.exports = server;
