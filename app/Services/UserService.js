'use strict'

const Event = use('Event')
const User = use('App/Models/User')
const Token = use('App/Models/Token')
const Hash = use('Hash')

class UserService {

  async store(user, response, auth) {
    const data = await User.create(user)
    if (user.account_type == 'team') {
      const token = await auth.generate(data)
      return token
    }
    return data ? this.created(data, response) : this.error(response)
  }

  /**
   *  Send Notifications(Mail, Slack) when created
   * @param {*} data 
   */
  async created(data, response) {
    this.sendMailNotification(data)
    this.sendSlackNotification(data)

    return response.status(201).json({
      status: 'success',
      message: 'User Added Successfully',
    })
  }
  /**
   * Error response
   */
  async error(response) {
    return response.status(400).json({
      status: 'success',
      message: 'Error occured while processing data',
    })
  }

  /**
  * Mail Notification Event
  * @param {*} param0 
  */
  async sendMailNotification({ full_name, email_address }) {
    await Event.fire('new::user::mail', {
      name: full_name,
      email: email_address
    })
  }
  /**
   * Slack Notification Event
   * @param {*} user 
   */
  async sendSlackNotification(user) {
    await Event.fire('new::user::slack', user)
  }

  async search(query, response) {
    let data = await User.query().where('full_name', 'LIKE', '%' + query + '%').fetch()
    if (!data) {
      return response.status(400).json({
        status: 'success',
        message: 'No record found',
      })
    }
  
    return response.status(200).json({
      status: 'success',
      message: data,
    })
  }

  async getAll(response) {
    let data = await User.all();
    if (!data) {
      return response.status(400).json({
        status: 'success',
        message: 'No record found',
      })
    }
  
    return response.status(200).json({
      status: 'success',
      message: data,
    })
  }


  async showToken(user, response) {
    try {
      const pwd = await Hash.make(user.password)
      const data = await User.query().where('email_address', user.email_address).fetch()//.where('password', pwd).fetch()
      console.log(data.id)
    } catch (error) {
      console.log(error)
    }
  }

}

module.exports = UserService