const router = require('express').Router();

const db = require('../../../database/knex');

router.get('/', async (req, res) => {
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
