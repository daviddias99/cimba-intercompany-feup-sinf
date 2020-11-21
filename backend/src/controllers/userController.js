const bcrypt = require('bcrypt');
const db = require('../../database/knex');

exports.all_users = async (req, res) => {
  const users = await db('users').select(['id', 'username']);
  return res.json(users);
};

exports.new_user = async (req, res) => {
  if (!req.body.username) {
    return res.status(400).json('Expected to have the Username Argument for Creating an User!');
  }

  const user = await db('users').insert([{ username: req.body.username }, { password: bcrypt.hashSync('req.body.password', 10) }], ['id', 'username']);
  return res.status(201).json(user);
};

exports.user_by_id = async (req, res) => {
  const user = await db('users').where({ id: req.params.id }).first(['id', 'username']);

  if (!user) {
    return res.status(404).json(`User with ID ${req.params.id} not found!`);
  }
  return res.json(user);
};

exports.user_company = async (req, res) => {
  const user = await db('users').where({ id: req.params.id }).first();

  if (!user) {
    return res.status(404).json(`User with ID ${req.params.id} not found!`);
  }

  const company = await db('companies').where({ id: user.company_id }).first(['id', 'company_key', 'app_id', 'tenant', 'organization']);

  return res.json(company);
};
