'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.enu('account_type', ['team', 'member'])
      table.string('full_name', 150).notNullable()
      table.string('job_title', 200).notNullable()
      table.string('portfolio', 254).nullable()
      table.string('password', 150).nullable()
      table.string('phone_number', 20).nullable()
      table.string('email_address', 200).notNullable().unique()
      table.string('avatar', 255).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
