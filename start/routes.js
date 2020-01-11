'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Event = use('Event')

Route.get('/', () => {
  return { greeting: 'Ogun Tech Community V1 API ' }
})

Route.group(() => {
  Route.post('/user', 'UserController.create')
  Route.get('/user/:query', 'UserController.find')
  Route.post('/subscribe', 'SubscribeController.store')
}).prefix('/api/v1').middleware('auth')
