const bcrypt = require('bcrypt');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => knex('users').insert([
      { username: 'david', password: bcrypt.hashSync('password', 10) },
      { username: 'eduardo', password: bcrypt.hashSync('password', 10) },
      { username: 'filipa', password: bcrypt.hashSync('password', 10) },
      { username: 'luis', password: bcrypt.hashSync('password', 10) },
    ]));
};
