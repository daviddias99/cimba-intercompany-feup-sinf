const bcrypt = require('bcrypt');
const { makeRequest } = require('../jasmin/makeRequest');

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

  const company = await req.app.db('companies').where({ id: user.company_id }).first(['id', 'company_key', 'app_secret', 'app_id', 'tenant', 'organization']);

  return res.json(company);
};

exports.updateUserCompany = async (req, res) => {
  if (parseInt(req.params.id, 10) !== req.user.id) {
    return res.status(403).json({ status: 200, id: 'Forbidden' });
  }

  const responseBody = req.body;
  delete responseBody.id;

  // Check for existent company in cimba database
  const existentCompany = (await req.app.db('companies')
    .where('company_key', req.body.company_key)
    .andWhere('app_id', req.body.app_id)
    .andWhere('app_secret', req.body.app_secret)
    .andWhere('tenant', req.body.tenant)
    .andWhere('organization', req.body.organization)
    .select('id')
    .first());

  if (existentCompany) {
    await req.app.db('users').where('id', req.user.id).update('company_id', existentCompany.id);
    responseBody.id = existentCompany.id;
    return res.status(200).json({ status: 200, id: 'Success', data: responseBody });
  }

  // Check for existent company in jasmin database
  const jasminCompanySearch = await makeRequest(`corepatterns/companies/${req.body.company_key}`, 'get', '', null, null, req.body);

  if (jasminCompanySearch.status) {
    return res.status(400).json({ status: 400, id: 'Bad Request', reason: 'Invalid company info.' });
  }

  // Create new company in cimba database and link user

  const newCompanyId = (await req.app.db('companies').insert(responseBody).returning('id'))[0];
  await req.app.db('users').where('id', req.user.id).update('company_id', newCompanyId);
  responseBody.id = newCompanyId;

  return res.status(200).json({ status: 200, id: 'Success', data: responseBody });
};
