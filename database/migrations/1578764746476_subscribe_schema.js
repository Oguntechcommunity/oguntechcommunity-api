'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubscribeSchema extends Schema {
  up () {
    this.create('subscribes', (table) => {
      table.increments()
      table.string('email', 200).notNullable()
      table.boolean('status').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('subscribes')
  }
}

module.exports = SubscribeSchema
