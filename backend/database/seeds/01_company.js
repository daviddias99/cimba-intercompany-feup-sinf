exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('companies').del()
    .then(() => knex('companies').insert([
      {
        id: 1, company_key: 'company_key', app_id: 'app_id', app_secret: 'app_secret', tenant: 'tenant', organization: 'organization',
      },
      {
        id: 2, company_key: 'company_key1', app_id: 'app_id1', app_secret: 'app_secret1', tenant: 'tenant1', organization: 'organization1',
      },
    ]));
};
