require('dotenv').config();

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('companies').del()
    .then(() => knex('companies').insert([
      {
        id: 1, company_key: 'PASTELARIADOCURA', name: 'PastelariaDocura', app_id: process.env.CLIENT_ID, app_secret: process.env.CLIENT_SECRET, tenant: '242993', organization: '242993-0001',
      },
      {
        id: 2, company_key: 'PADOCEDEPACOS', name: 'PadocePacos', app_id: process.env.CLIENT_ID, app_secret: process.env.CLIENT_SECRET, tenant: '242994', organization: '242994-0001',
      },
    ]));
};
