require('dotenv').config();

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('companies').del()
    .then(() => knex('companies').insert([
      {
        company_key: 'SINFAM', name: 'SINF_AM_1', app_id: process.env.CLIENT_ID, app_secret: process.env.CLIENT_SECRET, tenant: '242993', organization: '242993-0001',
      },
      {
        company_key: 'SINFAM', name: 'SINF_AM_2', app_id: process.env.CLIENT_ID, app_secret: process.env.CLIENT_SECRET, tenant: '242994', organization: '242994-0001',
      },
    ]));
};
