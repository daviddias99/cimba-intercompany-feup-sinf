const dotenv = require('dotenv');

dotenv.config({ path: `${module.path}/.env` });

const config = {};

config.express = {
  port: process.env.PORT || 8001,
  timeout: 20000,
  maxAge: 600,
  pollInterval: 15000,
};

config.jwtSecret = process.env.JWT_SECRET || 'secretstring';

module.exports = config;
