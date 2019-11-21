'use strict'
const Event = use('Event')
const User = exports = module.exports = {}

User.method = async () =>   {
    Event.on('new:user')
}
