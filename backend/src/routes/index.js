const express = require('express');
const db = require('../../database/knex');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to Cimba Intercompany.');
});

router.get('/users', async (req, res) => {
  try {
    const users = await db('users').select();
    res.send(users);
  } catch (err) {
    console.log('Failed to establish connection to database! Exiting...');
    console.log(err);
    process.exit(1);
  }
});

module.exports = router;
