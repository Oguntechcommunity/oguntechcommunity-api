'use strict'

// const validator = use('UserValidator')
const Service = use('UserService')
const { validate } = use('Validator')
/**
 * Resourceful controller for interacting with tests
 */
class UserController extends Service {

  /**
   * 
   * @param {*} Object 
   */
  async create({ request, response, auth }) {
    try {
      const check = await auth.check()
      const data = await auth.getUser()
      if (check && data) {
        return this.preStore(request, response, auth)
      }
    } catch (error) {
      response.send('missing or invalid api token')
    }
  }
  /**
   * 
   * @param {*} request 
   * @param {*} response 
   * @param {*} auth 
   */
  async preStore(request, response, auth) {
    const user = request.only([
      'account_type',
      'full_name',
      'portfolio',
      'job_title',
      'phone_number',
      'email_address',
      'avatar',
      'password'
    ])
    const rules = {
      full_name: 'required',
      portfolio: 'url',
      avatar: 'string',
      job_title: 'required|string',
      phone_number: 'string|min:11|max:13',
      email_address: 'required|email|unique:users,email_address'
    }

    const validation = await validate(user, rules)
    if (validation.fails()) {
      return response.status(400).json({
        status: 'success',
        message: validation._errorMessages,
      })
    }
    return this.store(user, response, auth)
  }
  /**
   * 
   * @param {*} Object
   */
  async find({ request, response, auth }) {
    try {
      const check = await auth.check()
      const data = await auth.getUser()
      if (check && data) {
        const query = request.params.query
        return this.search(query, response)
      }
    } catch (error) {
      response.send('missing or invalid api token')
    }
  }

}

module.exports = UserController
