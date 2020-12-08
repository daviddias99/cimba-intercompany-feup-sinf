const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const middlewares = require('./middlewares');
const config = require('./config').express;
const db = require('./database/knex');
const { pollPurchaseOrders, pollInvoice } = require('./processes/poll');

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

<<<<<<< HEAD
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});

pollOrders();
setInterval(pollOrders, config.pollInterval);
=======
pollPurchaseOrders();
setInterval(pollPurchaseOrders, config.pollInterval);

setTimeout(() => {
  pollInvoice();
  setInterval(pollInvoice, config.pollInterval);
}, config.pollInterval / 2);

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}.`);
});
>>>>>>> da7c8d8... Detect new sales invoice
