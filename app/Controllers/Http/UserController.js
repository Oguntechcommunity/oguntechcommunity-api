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
    // const validation = await validate(user, rules)
    return this.store(user, response)
  }

  // get rules() {
  //   return {
  //     account_type: 'string',
  //     full_name: 'required',
  //     portfolio: 'string',
  //     job_title: 'string',
  //     phone_number: 'string',
  //     email_address: 'required|email|unique:users',
  //     avatar: 'string'
  //   }
  // }

  async find({ request, response }) {
    const query = request.params.query
    return this.search(query, response)
  }

}

module.exports = UserController
