const express = require('express');
const db = require('./database/knex');

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to Cimba Intercompany.');
});

app.get('/users', async (req, res) => {
  try {
    const users = await db('users').select();
    res.send(users);
  } catch (err) {
    console.log('Failed to establish connection to database! Exiting...');
    console.log(err);
    process.exit(1);
  }
});

app.listen(8080, () => {
  console.log(`Listening on port 8080.`);
});
