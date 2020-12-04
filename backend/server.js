const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./routes');
const middlewares = require('./middlewares');
const db = require('./database/knex');

dotenv.config();

const app = express();
app.db = db;

// middleware
app.use(cors({ maxAge: 600 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middlewares.timeout(20000)); // In the future change to a config file

app.use('/', routes);
app.use(middlewares.notFound);
app.use(middlewares.error);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
