const db = require('../knex');

exports.jasminToIcId = async (companyId, jasminId) => {
  const company = await db('company_maps').where({ jasmin_id: jasminId, ic_id: companyId }).first();
  return company == null ? null : company.map_ic_id;
};

exports.icToJasminId = async (companyId, mapCompanyId) => {
  const company = await db('company_maps').where({ map_ic_id: mapCompanyId, ic_id: companyId }).first();

  return company == null ? null : company.jasmin_id;
};
