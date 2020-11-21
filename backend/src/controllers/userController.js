const bcrypt = require('bcrypt');
const db = require('../../database/knex');

exports.all_users = async (req, res) => {
  const users = await db('users').select(['id', 'username']);
  res.send(users);
};

exports.new_user = async (req, res) => {
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
};

exports.user_by_id = async (req, res) => {
  if (!req.params.id) {
    res.status(400).json('Expected to have the id as Paramenter for getting an User!').send();
    return;
  }

  const user = await db('users').where({ id: req.params.id }).first(['id', 'username']);

  if (!user) {
    res.status(404).json(`User with ID ${req.params.id} not found!`).send();
    return;
  }
  res.send(user);
};

exports.user_company = async (req, res) => {
  if (!req.params.id) {
    res.status(400).json('Expected to have the id as Paramenter for User\'s Company!').send();
    return;
  }

  const user = await db('users').where({ id: req.params.id }).first();

  if (!user) {
    res.status(404).json(`User with ID ${req.params.id} not found!`).send();
    return;
  }

  const company = await db('companies').where({ id: user.company_id }).first(['id', 'company_key', 'app_id', 'tenant', 'organization']);

  res.send(company);
};
