const { getCompanyById } = require('../database/methods/companyMethods');

exports.allCompanies = async (req, res) => {
  const companies = await req.app.db('companies').select(['id', 'name', 'company_key', 'app_id', 'tenant', 'organization']);
  res.json(companies);
};

exports.newCompany = async (req, res) => {
  const companiesWithSameCompanyKey = await req.app.db('companies').where({ company_key: req.body.company_key });

  if (companiesWithSameCompanyKey.length) {
    return res.status(400).json(`There is already a Company with company_key ${req.body.company_key}!`);
  }

  const user = await req.app.db('companies').insert([{
    company_key: req.body.company_key,
    app_id: req.body.app_id,
    appSecret: req.body.app_secret,
    tenant: req.body.tenant,
    organization: req.body.organization,
    name: req.body.name,
  }]);
  return res.status(201).json(user);
};

exports.companyById = async (req, res) => {
  const company = await getCompanyById(req.params.id);
  if (!company) {
    return res.status(404).json(`Company with ID ${req.params.id} not found!`);
  }
  return res.json(company);
};
