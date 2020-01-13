'use strict'

const Service = use('UserService')
const { validate } = use('Validator')
/**
 * Resourceful controller for interacting with tokengenerators
 */
class TokenGeneratorController extends Service {


  /**
   * Render a form to be used for creating a new tokengenerator.
   * GET tokengenerators/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, auth }) {
    const user = request.only([
      'account_type',
      'full_name',
      'email_address',
      'password'
    ])
    const rules = {
      account_type: 'required',
      full_name: 'required',
      password: 'required',
      email_address: 'required|email|unique:users,email_address'
    }

    const validation = await validate(user, rules)
    if (validation.fails()) {
      return response.status(400).json({
        status: 'success',
        message: validation._errorMessages,
      })
    }
    if (user.account_type !== 'team') {
      return response.send("You don't have access to the view this content")
    }

    return this.store(user, response, auth)
  }

  async find({ request, response }) {
    const user = request.only(['email_address', 'password'])
    const rules = {
      password: 'required',
      email_address: 'required'
    }
    const validation = await validate(user, rules)
    if (validation.fails()) {
      return response.status(400).json({
        status: 'success',
        message: validation._errorMessages,
      })
    }

    return this.showToken(user, response)
  }

}

module.exports = TokenGeneratorController
