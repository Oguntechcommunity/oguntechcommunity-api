'use strict'

const Event = use('Event')
const User = use('App/Models/User')
/**
 * Resourceful controller for interacting with tests
 */
class UserController {
  /**
   * Show a list of all tests.
   * GET tests
   */
  index() {
    return {
      status: 'hello world'
    }
  }

  async create({ request, response }) {
    const user = request.all()
    const data = await User.findOrCreate({
      email_address: user.email_address
    },
      user
    )

    if (data) {
      this.sendMailNotification(data)
      this.sendSlackNotification(data)
      
      return response.status(201).json({
        status: 'success',
        message: 'User Added Successfully',
      })
    }

    return response.status(400).json({
      status: 'success',
      message: 'Error occured while processing data',
    })
  }

  async sendMailNotification({ full_name, email_address }) {
    Event.fire('new::user', {
      name: full_name,
      email: email_address
    })
  }

  async sendSlackNotification(user) {
    Event.fire('new::user::slack', user)
  }


}

module.exports = UserController
