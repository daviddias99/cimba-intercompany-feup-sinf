exports.up = function (knex) {
  return knex.schema.createTable('companies', (table) => {
    table.increments();
    table.string('companyKey').notNullable();
    table.string('appID').notNullable();
    table.string('appSecret').notNullable();
    table.string('tenant').notNullable();
    table.string('organization').notNullable();
    table.unique('companyKey');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('companies');
};
