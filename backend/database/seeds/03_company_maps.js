exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('company_maps').del()
    .then(() => knex('company_maps').insert([
      { jasmin_id: '0001', map_ic_id: 2, ic_id: 1 },
      { jasmin_id: '0001', map_ic_id: 1, ic_id: 2 },
    ]));
};
