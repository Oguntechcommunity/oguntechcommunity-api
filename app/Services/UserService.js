'use strict'

const Event = use('Event')
const User = use('App/Models/User')

class UserService {

    async store(user) {
        return await User.findOrCreate({ email_address: user.email_address }, user)
    }
}

module.exports = UserService