exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('orders').del();
    // .then(() => knex('orders').insert([
    //   {
    //     company_id: '1', order_id: '6bf29e1a-360e-42ae-afab-cf9c3c5db4d4', jasmin_created_on: '2020-12-05T15:05:16.7755647+00:00', type: 'purchase',
    //   },
    // ]));
};
