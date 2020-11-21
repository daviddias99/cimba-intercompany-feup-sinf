exports.up = function (knex) {
  return knex.schema
    .createTable('companies', (table) => {
      table.increments();
      table.string('company_key').notNullable();
      table.string('app_id').notNullable();
      table.string('app_secret').notNullable();
      table.string('tenant').notNullable();
      table.string('organization').notNullable();
      table.unique('company_key');
    })
    .createTable('users', (table) => {
      table.increments();
      table.string('username').notNullable();
      table.string('password').notNullable();
      table.unique('username');
      table.integer('company_id').unsigned();
      table.foreign('company_id').references('companies.id');
    })
    .createTable('item_maps', (table) => {
      table.increments();
      table.string('local_id').notNullable();
      table.string('item_id').notNullable();
      table.integer('company_id').unsigned();
      table.foreign('company_id').references('companies.id');

      table.unique(['local_id', 'company_id'], 'items_map_unique');
    })
    .createTable('company_maps', (table) => {
      table.increments();
      table.string('local_id').notNullable();
      table.string('company_key').notNullable();
      table.foreign('company_key').references('companies.company_key');
      table.integer('company_id').unsigned();
      table.foreign('company_id').references('companies.id');

      table.unique(['local_id', 'company_id'], 'company_map_unique');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('item_maps')
    .dropTable('company_maps')
    .dropTable('users')
    .dropTable('companies');
};
