const db = require('../knex');

exports.mapLocalItemId = async (icId, jasminId, mapicId) => {
  const item = await db('item_maps').where({ jasmin_id: jasminId, ic_id: icId, map_ic_id: mapicId }).first();
  return item == null ? null : item.item_id;
};

exports.convertItemQuantity = async (icId, jasminId, mapicId, quantity) => {
  const item = await db('item_maps').where({ jasmin_id: jasminId, ic_id: icId, map_ic_id: mapicId }).first();
  return item == null ? null : item.item_quant * quantity;
};
