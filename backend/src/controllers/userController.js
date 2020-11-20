const db = require('../../database/knex');

exports.all_users = async (req, res) => {
  try {
    const users = await db('users').select();
    res.send(users);
  } catch (err) {
    console.log('Failed to establish connection to database! Exiting...');
    console.log(err);
    process.exit(1);
  }
};

exports.new_user = async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).json('Expected to have the Name Argument for Creating an User!').send();
      return;
    }

    const user = await db('users').insert([{ name: req.body.name }], ['id', 'name']);
    res.send(user);
  } catch (err) {
    console.log('Failed to establish connection to database! Exiting...');
    console.log(err);
    process.exit(1);
  }
};
