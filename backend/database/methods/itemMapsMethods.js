const db = require('../knex');

exports.mapLocalItemId = async (companyId, localId, mapCompanyId) => {
  const item = await db('item_maps').where({ local_id: localId, company_id: companyId, map_company_id: mapCompanyId }).first();
  return item == null ? null : item.item_id;
};
