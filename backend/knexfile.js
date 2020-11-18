const dotenv = require('dotenv');

dotenv.config();

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: `${module.path}/database/migrations`,
    },
    seeds: {
      directory: `${module.path}/database/seeds`,
    },
  },

};
