exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('companies').del()
    .then(() => knex('companies').insert([
      {
        company_key: 'company_key', app_id: 'app_id', app_secret: 'app_secret', tenant: 'tenant', organization: 'organization',
      },
    ]));
};
