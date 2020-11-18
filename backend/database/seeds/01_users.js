exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => knex('users').insert([
      { name: 'david' },
      { name: 'eduardo' },
      { name: 'filipa' },
      { name: 'luis' },
    ]));
};
