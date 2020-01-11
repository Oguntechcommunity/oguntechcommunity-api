'use strict'
const { validate } = use('Validator')
const Service = use('SubscribeService')
/**
 * Resourceful controller for interacting with subscribes
 */
class SubscribeController extends Service {

  /**
   * Create/save a new subscribe.
   * POST subscribes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const check = await auth.check()
      const data = await auth.getUser()
      if (check && data) {
        return this.preStore(request, response)
      }
    } catch (error) {
      response.send('missing or invalid api token')
    }
  }

  async preStore(request, response) {
    const user = request.only(['email', 'status'])
    const rule = {
      email: 'required|email'
    }
    const validation = await validate(user, rule)
    if (validation.fails()) {
      return response.status(400).json({
        status: 'success',
        message: validation._errorMessages,
      })
    }
    if(user.status == '0') {
      return this.destroy(user, response)
    }
    return this.create(user, response)
  }

  /**
   * Display a single subscribe.
   * GET subscribes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ params, request, response, view }) {
  }

}

module.exports = SubscribeController
