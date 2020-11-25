const bcrypt = require('bcrypt');

exports.allUsers = async (req, res) => {
  const users = await req.app.db('users').select(['id', 'username']);
  return res.json(users);
};

exports.newUser = async (req, res) => {
  const user = await req.app.db('users').insert([{ username: req.body.username }, { password: bcrypt.hashSync('req.body.password', 10) }], ['id', 'username']);
  return res.status(201).json(user);
};

exports.userById = async (req, res) => {
  const user = await req.app.db('users').where({ id: req.params.id }).first(['id', 'username']);

  if (!user) {
    return res.status(404).json(`User with ID ${req.params.id} not found!`);
  }
  return res.json(user);
};

exports.userCompany = async (req, res) => {
  const user = await req.app.db('users').where({ id: req.params.id }).first();

  if (!user) {
    return res.status(404).json(`User with ID ${req.params.id} not found!`);
  }

  const company = await req.app.db('companies').where({ id: user.company_id }).first(['id', 'company_key', 'app_id', 'tenant', 'organization']);

  return res.json(company);
};
