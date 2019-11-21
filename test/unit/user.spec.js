'use strict'

const Hash = use('Hash')
const User = use('App/Models/User')
const { test, trait } = use('Test/Suite')('User')

// trait('Test/ApiClient')

test('make sure 2 + 2 is 4', async ({ assert }) => {
  assert.equal(2 + 2, 4)
})


