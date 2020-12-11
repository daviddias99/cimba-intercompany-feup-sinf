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
      table.integer('ic_id').unsigned();
      table.foreign('ic_id').references('companies.id').onUpdate('CASCADE').onDelete('CASCADE');
    })
    .createTable('item_maps', (table) => {
      table.increments();
      table.string('jasmin_id').notNullable();
      table.string('item_id').notNullable();
      table.integer('map_ic_id').notNullable();
      table.foreign('map_ic_id').references('companies.id').onUpdate('CASCADE').onDelete('CASCADE');
      table.integer('ic_id').unsigned();
      table.foreign('ic_id').references('companies.id').onUpdate('CASCADE').onDelete('CASCADE');

      table.unique(['jasmin_id', 'map_ic_id', 'ic_id'], 'items_map_unique');
    })
    .createTable('company_maps', (table) => {
      table.increments();
      table.string('jasmin_id').notNullable();
      table.integer('map_ic_id').notNullable();
      table.foreign('map_ic_id').references('companies.id').onUpdate('CASCADE').onDelete('CASCADE');
      table.integer('ic_id').unsigned();
      table.foreign('ic_id').references('companies.id').onUpdate('CASCADE').onDelete('CASCADE');

      table.unique(['jasmin_id', 'ic_id'], 'company_map_unique');
    })
    .createTable('sessions', (table) => {
      table.increments();
      table.integer('user_id').references('id').inTable('users').notNullable()
        .onDelete('CASCADE');
      table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
    })
    .createTable('orders', (table) => {
      table.increments();
      table.integer('ic_id').unsigned();
      table.foreign('ic_id').references('companies.id').onUpdate('CASCADE').onDelete('CASCADE');
      table.string('order_id').notNullable();
      table.unique('order_id');
      table.timestamp('created_on').defaultTo(knex.fn.now());
      table.enu('type', ['purchase', 'sale'], { useNative: true, enumName: 'order_type' }).notNullable();
      table.string('invoice_id');
      table.string('delivery_id');
      table.string('payment_id');
    })
    .createTable('orders_maps', (table) => {
      table.string('sales_order_id').notNullable();
      table.foreign('sales_order_id').references('orders.order_id').onUpdate('CASCADE').onDelete('CASCADE');
      table.string('purchase_order_id').notNullable();
      table.foreign('purchase_order_id').references('orders.order_id').onUpdate('CASCADE').onDelete('CASCADE');
    })
    .then(() => triggersUp.forEach(async (elem) => {
      await knex.schema.raw(elem);
    }));
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('orders_maps')
    .dropTable('orders')
    .dropTable('sessions')
    .dropTable('item_maps')
    .dropTable('company_maps')
    .dropTable('users')
    .dropTable('companies')
    .then(() => triggersDown.forEach(async (elem) => {
      await knex.raw(elem);
    }));
};
