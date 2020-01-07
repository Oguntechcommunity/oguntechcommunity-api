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
   * @param {*} param0 
   */
  async create({ request, response }) {
    const user = request.all()
    const rules = {
      full_name: 'required',
      portfolio: 'url',
      job_title: 'required|string',
      phone_number: 'string|min:11|max:13',
      email_address: 'required|email|unique:users,email_address'
    }
    const validation = await validate(user, rules)
    if(validation.fails()) {
      return response.status(400).json({
        status: 'success',
        message: validation._errorMessages,
      })
    }
    return this.store(user, response)
  }

  async find({ request, response }) {
    const query = request.params.query
    return this.search(query, response)
  }

}

module.exports = UserController
