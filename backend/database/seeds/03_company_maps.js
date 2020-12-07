exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('company_maps').del()
    .then(() => knex('company_maps').insert([
      { local_id: '0001', map_company_id: 2, company_id: 1 },
      { local_id: '0002', map_company_id: 2, company_id: 1 },
      { local_id: '0003', map_company_id: 2, company_id: 1 },
      { local_id: '0004', map_company_id: 2, company_id: 1 },
      { local_id: '0002', map_company_id: 1, company_id: 2 },
      { local_id: '0003', map_company_id: 1, company_id: 2 },
      { local_id: '0004', map_company_id: 1, company_id: 2 },
    ]));
};
