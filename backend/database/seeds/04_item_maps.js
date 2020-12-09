exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('item_maps').del()
    .then(() => knex('item_maps').insert([
      {
        local_id: '1111', item_id: '2323', map_company_id: 2, company_id: 1,
      },
      {
        local_id: 'local_id1', item_id: 'PORTES', map_company_id: 2, company_id: 1,
      },
      {
        local_id: 'local_id2', item_id: 'PORTES', map_company_id: 2, company_id: 1,
      },
      {
        local_id: 'local_id', item_id: 'PORTES', map_company_id: 1, company_id: 2,
      },
      {
        local_id: 'local_id1', item_id: 'PORTES', map_company_id: 1, company_id: 2,
      },
      {
        local_id: 'local_id2', item_id: 'PORTES', map_company_id: 1, company_id: 2,
      },
    ]));
};
