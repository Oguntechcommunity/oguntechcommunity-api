'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker) => {
  return {
    username: faker.username(),
    account_type: 'member',
    full_name: faker.first() + '-' + faker.last(),
    portfolio: faker.url(),
    job_title: faker.company(),
    phone_number: faker.phone(),
    email_address: faker.email(),
    password: '',
    avatar: faker.domain()
  }
})
