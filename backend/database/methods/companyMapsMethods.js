const db = require('../knex');

exports.mapLocalCompanyId = async (companyId, localId) => (await db('company_maps').where({ local_id: localId, company_id: companyId }).first()).company_key;

exports.mapUniversalCompanyId = async (companyKey, companyId) => {
  const ownerCompany = await db('companies').where({ company_key: companyKey }).first();
  const mapCompany = await db('companies').where({ id: companyId }).first();

  return (await db('company_maps').where({ company_key: mapCompany.company_key, company_id: ownerCompany.id }).first()).local_id;
};
