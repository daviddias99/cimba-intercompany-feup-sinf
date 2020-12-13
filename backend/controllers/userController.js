const bcrypt = require('bcrypt');
const { makeRequest } = require('../jasmin/makeRequest');
const { getJasminToken } = require('../jasmin/auth');

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

  const company = await req.app.db('companies').where({ id: user.ic_id }).first(['id', 'company_key', 'app_secret', 'app_id', 'tenant', 'organization', 'name']);

  return res.json(company);
};

exports.updateUserCompany = async (req, res) => {
  if (parseInt(req.params.id, 10) !== req.user.id) {
    return res.status(403).json({ status: 200, id: 'Forbidden' });
  }
  const responseBody = req.body;
  delete responseBody.id;
  // Check for existent company in cimba database
  let newCompany = false;
  const existentCompany = (await req.app.db('companies')
    .where('tenant', req.body.tenant)
    .andWhere('organization', req.body.organization)
    .select('*')
    .first());

  if (!existentCompany) {
    newCompany = true;
  }

  if (Object.keys(responseBody).every((x) => responseBody[x] === existentCompany[x])) {
    await req.app.db('users').where('id', req.user.id).update('ic_id', existentCompany.id);
    return res.status(200).json({ status: 200, id: 'Success', data: existentCompany });
  }

  const token = await getJasminToken(req.body.app_id, req.body.app_secret);
  if (token === null) {
    return res.status(400).json({ status: 400, id: 'Bad Request', reason: 'Invalid company info: could not authenticate using given client ID and secret.' });
  }
  // Check for existent company in jasmin database
  const jasminCompanySearch = await makeRequest(`corepatterns/companies/${req.body.ic_id}`, 'get', '', null, null, req.body);

  if (jasminCompanySearch.status !== 200) {
    return res.status(400).json({ status: 400, id: 'Bad Request', reason: 'Invalid company info.' });
  }
  // Create new company in cimba database and link user

  if (newCompany) {
    responseBody.name = jasminCompanySearch.data.name;
    const newCompanyId = (await req.app.db('companies').insert(responseBody).returning('id'))[0];
    await req.app.db('users').where('id', req.user.id).update('ic_id', newCompanyId);
    responseBody.id = newCompanyId;
  } else {
    (await req.app.db('companies').update(responseBody).where({ id: existentCompany.id }).returning('id')[0]);
  }

  return res.status(200).json({ status: 200, id: 'Success', data: responseBody });
};
