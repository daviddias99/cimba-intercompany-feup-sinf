const db = require('../knex');

exports.mapLocalItemId = async (companyId, localId, companyKey) => {
  const item = await db('item_maps').where({ local_id: localId, company_id: companyId, company_key: companyKey }).first();
  return item == null ? null : item.item_id;
};
