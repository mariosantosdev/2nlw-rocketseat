import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary()
        table.timestamp('create_at').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable()
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('teachers')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('connections')
}