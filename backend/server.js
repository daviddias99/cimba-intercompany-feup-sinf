const express = require('express');
const routes = require('./routes');
const middlewares = require('./middlewares');

const app = express();

const db = require('./database/knex');
const { getToken } = require('./jasmin/tokens');

app.listen(8080, () => {
  console.log('Listening on port 8080.');
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middlewares.timeout(20000)); // In the future change to a config file

app.use('/', routes);
app.db = db;
app.use(middlewares.notFound);
app.use(middlewares.error);
