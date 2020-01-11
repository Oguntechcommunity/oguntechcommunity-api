'use strict'

const Subscribe = use('App/Models/Subscribe')

class SubscribeService {

	/**
	 * Store user email to subscription list
	 * 
	 * @param {*} user 
	 * @param {*} response 
	 */
	async create(user, response) {
		const subscribe = await Subscribe.findOrCreate({
			email: user.email
		}, user)
		if (!subscribe) {
			response.status(400).json({
				status: 'success',
				message: 'Error occured while processing data',
			})
		}
		response.status(201).json({
			status: 'success',
			message: 'Email Added to subscription list successfully',
		})
	}

	async destroy(user, response) {
		const unsubscribe = await Subscribe.query().where('email', user.email).delete()
		return response.status(200).json({
			status: 'success',
			message: 'User email unsubscribe successfully'
		})
	}
}

module.exports = SubscribeService