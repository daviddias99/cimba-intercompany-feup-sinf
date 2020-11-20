exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('companies').del()
    .then(() => knex('companies').insert([
      {
        companyKey: 'companyKey', appID: 'appID', appSecret: 'appSecret', tenant: 'tenant', organization: 'organization',
      },
    ]));
};
