exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('item_maps').del()
    .then(() => knex('item_maps').insert([
      {
        jasmin_id: '1111', item_id: '2323', map_ic_id: 2, ic_id: 1,
      },
      {
        jasmin_id: '12345', item_id: '6789', map_ic_id: 2, ic_id: 1,
      },
      {
        jasmin_id: 'local_id1', item_id: 'PORTES', map_ic_id: 2, ic_id: 1,
      },
      {
        jasmin_id: 'local_id2', item_id: 'PORTES', map_ic_id: 2, ic_id: 1,
      },
      {
        jasmin_id: 'local_id', item_id: 'PORTES', map_ic_id: 1, ic_id: 2,
      },
      {
        jasmin_id: 'local_id1', item_id: 'PORTES', map_ic_id: 1, ic_id: 2,
      },
      {
        jasmin_id: 'local_id2', item_id: 'PORTES', map_ic_id: 1, ic_id: 2,
      },
    ]));
};
