const bcrypt = require('bcrypt');
const db = require('../../database/knex');

exports.all_users = async (req, res) => {
  try {
    const users = await db('users').select(['id', 'username']);
    res.send(users);
  } catch (err) {
    console.log('Failed to establish connection to database! Exiting...');
    console.log(err);
    process.exit(1);
  }
};

exports.new_user = async (req, res) => {
  try {
    if (!req.body.username) {
      res.status(400).json('Expected to have the Username Argument for Creating an User!').send();
      return;
    }

    if (!req.body.password) {
      res.status(400).json('Expected to have the Password Argument for Creating an User!').send();
      return;
    }

    const user = await db('users').insert([{ username: req.body.username }, { password: bcrypt.hashSync('req.body.password', 10) }], ['id', 'username']);
    res.send(user);
  } catch (err) {
    console.log('Failed to establish connection to database! Exiting...');
    console.log(err);
    process.exit(1);
  }
};
