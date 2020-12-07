exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('company_maps').del()
    .then(() => knex('company_maps').insert([
      { local_id: 'local_id', map_company_id: 2, company_id: 1 },
      { local_id: 'local_id1', map_company_id: 2, company_id: 1 },
      { local_id: 'local_id2', map_company_id: 2, company_id: 1 },
      { local_id: 'local_id', map_company_id: 1, company_id: 2 },
      { local_id: 'local_id1', map_company_id: 1, company_id: 2 },
      { local_id: 'local_id2', map_company_id: 1, company_id: 2 },
    ]));
};
