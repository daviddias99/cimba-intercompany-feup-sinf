const db = require('../../database/knex');

exports.all_companies = async (req, res) => {
  const companies = await db('companies').select(['id', 'company_key', 'app_id', 'tenant', 'organization']);
  res.send(companies);
};

exports.new_company = async (req, res) => {
  if (!req.body.company_key || !req.body.app_id || !req.body.app_secret || !req.body.tenant
    || !req.body.organization) {
    res.status(400).json('Expected to have the company_key, app_id, app_secret, tenant and organization as Arguments for Creating a Company!').send();
    return;
  }

  const companiesWithSameCompanyKey = await db('companies').where({ company_key: req.body.company_key });

  if (companiesWithSameCompanyKey.length) {
    res.status(400).json(`There is already a Company with company_key ${req.body.company_key}!`).send();
    return;
  }

  const user = await db('companies').insert([{
    company_key: req.body.company_key,
    app_id: req.body.app_id,
    appSecret: req.body.app_secret,
    tenant: req.body.tenant,
    organization: req.body.organization,
  }], ['id', 'company_key', 'app_id', 'tenant', 'organization']);
  res.send(user);
};

exports.company_by_id = async (req, res) => {
  if (!req.params.id) {
    res.status(400).json('Expected to have the id as Paramenter for getting a Company!').send();
    return;
  }

  const user = await db('companies').where({ id: req.params.id }).first(['id', 'company_key', 'app_id', 'tenant', 'organization']);
  if (!user) {
    res.status(404).json(`Company with ID ${req.params.id} not found!`).send();
    return;
  }
  res.send(user);
};
