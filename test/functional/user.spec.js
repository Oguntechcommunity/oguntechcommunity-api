'use strict'

const Event = use('Event')
const { test, trait } = use('Test/Suite')('User')
trait('Test/ApiClient')

test('As a user I should be able to register', async ({ assert, client }) => {
  const data = {
    account_type: 'team',
    full_name: 'Azeez Abiodun',
    portfolio: 'https://abiodunazeez.com',
    job_title: 'software developer',
    phone_number: '07087322191',
    email_address: 'info100@gmail.com',
    avatar: 'http://google.com/image.png',
  }
  const response = await client.post('/v1/user').send(data).end()
  switch (response.status) {
    case 400:
      response.assertStatus(400)
      response.assertJSONSubset({
        status: 'success',
        message: 'User Already already registered',
      })
      break
    default:
      response.assertStatus(201)
      response.assertJSONSubset({
        status: 'success',
        message: 'User Added Successfully',
      })
      break
  }
})

test('user should get email notification to slack triggered by event', async ({ assert, client }) => {
  const data = {
    account_type: 'team',
    full_name: 'Azeez Abiodun',
    portfolio: 'https://abiodunazeez.com',
    job_title: 'software developer',
    phone_number: '07087322191',
    email_address: 'info100@gmail.com',
    password: '123123',
    avatar: 'http://google.com/image.png'
  }
  const response = await client.post('/v1/user').send(data).end()
  // assert.plan(1)
  Event.fake()
  Event.restore()
})

// test('As a user I should be able to find member information', async ({ assert,client }) => {
//    const response = await client.get( '/v1/get' ).end()
//    response.assertStatus(200)
// })

test('As a user I should be able to subscribe', async ({ assert }) => {

})

test('As a user I should be able to receive email for updates of events/posts, etc. after subscription', async ({ assert }) => {

})

test('As a user I should be able to view list of jobs on slack', async ({ assert }) => {

})