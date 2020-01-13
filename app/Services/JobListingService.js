const got = require('got')
const xml2json = require('xml2json')
/**
 * Repository that connect with external 
 * API for resources
 */
class JobListingService {

	constructor(job) {
		this.url = job.url
		this.type = job.dataType
	}
	/**
	 * This handles the external endpoint directly
	 */
	async get() {
		try {
			const data = await got(`${this.url}`);
			return this.response(data.body)
		} catch (error) {
			return {
				status: 'success',
				message: 'Unable to locate external endpoint'
			}
		}
	}

	async response(data) {
		if(this.type === 'json') {
			return this.isJson(data)
		}
		return this.isXML(data)
	}

	/**
	 * Convert string base response 
	 * to JSON
	 * 
	 * @param {*} data 
	 */
	async isJson(data) {
		return await JSON.parse(data)
	}
	/**
	 *  Convert XML response to JSON
	 * 
	 * @param {*} data 
	 */
	async isXML(data) {
		const resp = await xml2json.toJson(data);
		return JSON.parse(resp).rss.channel.item || undefined
	}

}

module.exports = JobListingService