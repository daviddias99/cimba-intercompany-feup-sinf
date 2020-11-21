exports.up = function (knex) {
  return knex.schema
    .createTable('companies', (table) => {
      table.increments();
      table.string('companyKey').notNullable();
      table.string('appID').notNullable();
      table.string('appSecret').notNullable();
      table.string('tenant').notNullable();
      table.string('organization').notNullable();
      table.unique('companyKey');
    })
    .createTable('users', (table) => {
      table.increments();
      table.string('username').notNullable();
      table.string('password').notNullable();
      table.unique('username');
      table.integer('company_id').unsigned();
      table.foreign('company_id').references('companies.id');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('users')
    .dropTable('companies');
};
