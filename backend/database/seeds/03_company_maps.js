exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('company_maps').del()
    .then(() => knex('company_maps').insert([
      { local_id: 'local_id', company_key: 'SINFAM', company_id: 1 },
      { local_id: 'local_id1', company_key: 'SINFAM', company_id: 1 },
      { local_id: 'local_id2', company_key: 'SINFAM', company_id: 1 },
      // { local_id: 'local_id', company_key: 'SINF_AM_2', company_id: 2 },
      // { local_id: 'local_id1', company_key: 'SINF_AM_2', company_id: 2 },
      // { local_id: 'local_id2', company_key: 'SINF_AM_2', company_id: 2 },
    ]));
};
