
const express = require('express');
const routes = require('./routes');

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}.`);
});

app.use('/', routes);
