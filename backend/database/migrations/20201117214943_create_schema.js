const { triggersUp, triggersDown } = require('../triggers');

exports.up = function (knex) {
  return knex.schema
    .createTable('companies', (table) => {
      table.increments();
      table.string('company_key').notNullable();
      table.string('app_id').notNullable();
      table.string('app_secret').notNullable();
      table.string('tenant').notNullable();
      table.string('organization').notNullable();
      table.string('name').notNullable();
      table.timestamp('most_recent_order', { useTz: true }).defaultTo(knex.fn.now());
      table.unique(['tenant', 'organization'], 'tenant_organization_unique');
    })
    .createTable('users', (table) => {
      table.increments();
      table.string('username').notNullable();
      table.string('password').notNullable();
      table.unique('username');
      table.integer('company_id').unsigned();
      table.foreign('company_id').references('companies.id').onUpdate('CASCADE').onDelete('CASCADE');
    })
    .createTable('item_maps', (table) => {
      table.increments();
      table.string('local_id').notNullable();
      table.string('item_id').notNullable();
      table.integer('map_company_id').notNullable();
      table.foreign('map_company_id').references('companies.id').onUpdate('CASCADE').onDelete('CASCADE');
      table.integer('company_id').unsigned();
      table.foreign('company_id').references('companies.id').onUpdate('CASCADE').onDelete('CASCADE');

      table.unique(['local_id', 'map_company_id', 'company_id'], 'items_map_unique');
    })
    .createTable('company_maps', (table) => {
      table.increments();
      table.string('local_id').notNullable();
      table.integer('map_company_id').notNullable();
      table.foreign('map_company_id').references('companies.id').onUpdate('CASCADE').onDelete('CASCADE');
      table.integer('company_id').unsigned();
      table.foreign('company_id').references('companies.id').onUpdate('CASCADE').onDelete('CASCADE');

      table.unique(['local_id', 'company_id'], 'company_map_unique');
    })
    .createTable('sessions', (table) => {
      table.increments();
      table.integer('user_id').references('id').inTable('users').notNullable()
        .onDelete('CASCADE');
      table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
    })
    .createTable('orders', (table) => {
      table.increments();
      table.integer('company_id').unsigned();
      table.foreign('company_id').references('companies.id').onUpdate('CASCADE').onDelete('CASCADE');
      table.string('order_id').notNullable();
      table.unique('order_id');
      table.timestamp('jasmin_created_on').defaultTo(knex.fn.now());
      table.enu('type', ['purchase', 'sale'], { useNative: true, enumName: 'order_type' }).notNullable();
      table.string('invoice_id');
      table.string('delivery_id');
      table.string('payment_id');
    })
    .then(() => triggersUp.forEach(async (elem) => {
      await knex.schema.raw(elem);
    }));
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('item_maps')
    .dropTable('company_maps')
    .dropTable('users')
    .dropTable('companies')
    .dropTable('orders')
    .then(() => triggersDown.forEach(async (elem) => {
      await knex.raw(elem);
    }));
};
