exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('company_maps').del()
    .then(() => knex('company_maps').insert([
      { local_id: '0002', company_key: 'SINF_AM_1', company_id: 1 },
      { local_id: '0003', company_key: 'SINF_AM_1', company_id: 1 },
      { local_id: '0004', company_key: 'SINF_AM_1', company_id: 1 },
      { local_id: '0002', company_key: 'SINF_AM_2', company_id: 2 },
      { local_id: '0003', company_key: 'SINF_AM_2', company_id: 2 },
      { local_id: '0004', company_key: 'SINF_AM_2', company_id: 2 },
    ]));
};
