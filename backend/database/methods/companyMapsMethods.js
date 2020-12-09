const db = require('../knex');

exports.mapLocalCompanyId = async (companyId, localId) => {
  const company = await db('company_maps').where({ local_id: localId, company_id: companyId }).first();
  return company == null ? null : company.map_company_id;
};

exports.mapUniversalCompanyId = async (companyId, mapCompanyId) => {
  const company = await db('company_maps').where({ map_company_id: mapCompanyId, company_id: companyId }).first();

  return company == null ? null : company.local_id;
};
