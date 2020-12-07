const db = require('../knex');

exports.mapLocalCompanyId = async (companyId, localId) => {
  const company = await db('company_maps').where({ local_id: localId, company_id: companyId }).first();
  return company == null ? null : company.company_key;
};

exports.mapUniversalCompanyId = async (companyKey, companyId) => {
  const ownerCompany = await db('companies').where({ company_key: companyKey }).first();
  const mapCompany = await db('companies').where({ id: companyId }).first();

  const company = await db('company_maps').where({ company_key: mapCompany.company_key, company_id: ownerCompany.id }).first();

  return company == null ? null : company.local_id;
};
