const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const middlewares = require('./middlewares');
const config = require('./config').express;
const db = require('./database/knex');
const { pollOrders } = require('./processes/poll');

const app = express();

// middleware
app.use(cors({ maxAge: config.maxAge }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middlewares.timeout(config.timeout));

app.db = db;
app.use('/', routes);
app.use(middlewares.notFound);
app.use(middlewares.error);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});

pollOrders();
setInterval(pollOrders, config.pollInterval);
