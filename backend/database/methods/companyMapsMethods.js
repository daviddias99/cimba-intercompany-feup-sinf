const db = require('../knex');

exports.jasminToIcId = async (icId, jasminId) => {
  const company = await db('company_maps').where({ jasmin_id: jasminId, ic_id: icId }).first();
  return company == null ? null : company.map_ic_id;
};

exports.icToJasminId = async (icId, mapicId) => {
  const company = await db('company_maps').where({ map_ic_id: mapicId, ic_id: icId }).first();

  return company == null ? null : company.jasmin_id;
};
