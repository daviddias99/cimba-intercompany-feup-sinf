const express = require('express');
const routes = require('./routes');
const middlewares = require('./middlewares');

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}.`);
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middlewares.timeout(20000)); // In the future change to a config file

app.use('/', routes);
app.use(middlewares.notFound);
app.use(middlewares.error);
