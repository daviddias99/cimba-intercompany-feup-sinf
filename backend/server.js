const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const middlewares = require('./middlewares');
const config = require('./config').express;
const db = require('./database/knex');

const app = express();

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}.`);
});

// middleware
app.use(cors({ maxAge: config.maxAge }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middlewares.timeout(config.timeout)); // In the future change to a config file

app.db = db;
app.use('/', routes);
app.use(middlewares.notFound);
app.use(middlewares.error);
