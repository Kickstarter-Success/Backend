const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js')
const authRouter = require('../users/auth-router.js')
const kickRouter = require('../kickstarter/kick-router.js')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/kickstarter', authenticate, kickRouter);

module.exports = server;