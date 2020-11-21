const db = require('../../database/knex');

exports.all_companies = async (req, res) => {
  try {
    const companies = await db('companies').select(['id', 'companyKey', 'appID', 'tenant', 'organization']);
    res.send(companies);
  } catch (err) {
    console.log('Failed to establish connection to database! Exiting...');
    console.log(err);
    process.exit(1);
  }
};

exports.new_company = async (req, res) => {
  try {
    if (!req.body.companyKey || !req.body.appID || !req.body.appSecret || !req.body.tenant
      || !req.body.organization) {
      res.status(400).json('Expected to have the companyKey, appID, appSecret, tenant and organization as Arguments for Creating a Company!').send();
      return;
    }

    const companiesWithSameCompanyKey = await db('companies').where({ companyKey: req.body.companyKey });

    if (companiesWithSameCompanyKey.length) {
      res.status(400).json(`There is already a Company with companyKey ${req.body.companyKey}!`).send();
      return;
    }

    const user = await db('companies').insert([{
      companyKey: req.body.companyKey,
      appID: req.body.appID,
      appSecret: req.body.appSecret,
      tenant: req.body.tenant,
      organization: req.body.organization,
    }], ['id', 'companyKey', 'appID', 'tenant', 'organization']);
    res.send(user);
  } catch (err) {
    console.log('Failed to establish connection to database! Exiting...');
    console.log(err);
    process.exit(1);
  }
};

exports.company_by_id = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json('Expected to have the id as Paramenter for getting a Company!').send();
      return;
    }

    const user = await db('companies').where({ id: req.params.id }).first(['id', 'companyKey', 'appID', 'tenant', 'organization']);
    if (!user) {
      res.status(404).json(`Company with ID ${req.params.id} not found!`).send();
      return;
    }
    res.send(user);
  } catch (err) {
    console.log('Failed to establish connection to database! Exiting...');
    console.log(err);
    process.exit(1);
  }
};
