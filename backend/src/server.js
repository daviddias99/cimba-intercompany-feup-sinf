const express = require('express');
const routes = require('./routes');

const app = express();

const db = require('../database/knex');

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}.`);
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);
app.db = db;
