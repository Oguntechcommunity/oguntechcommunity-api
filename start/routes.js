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

Route.group(() => {
  // Route.get('/users', 'UserController.index')
  Route.post('/user', 'UserController.create')
  Route.get('/test', () => {
    Event.fire('new::user', {name: 'abiodun'})
  })
}).prefix('v1')