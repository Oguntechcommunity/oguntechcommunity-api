'use strict'
const Env = use('Env')
const JobService = use('JobService')
/**
 * Resourceful controller for interacting with joblistings
 */
class JobListingController {

  constructor() {
    this.url = {
      github: {
        url: Env.get('GITHUB'),
        dataType: 'json'
      },
      stackoverflow: {
        url: Env.get('STACKOVERFLOW'),
        dataType: 'xml'
      }
    }
  }
  /**
   * Render a form to be used for creating a new joblisting.
   * GET joblistings/create
   */
  async get({ response }) {
    try {
      const job = new JobService(this.url.stackoverflow)
      const resp = await job.get()
      response.status(200).json({
        status: 'success',
        message: resp
      })
    } catch (error) {
      response.status(500).json({
        status: 'success',
        message: 'Unable to get jobs'
      })
    }
  }

}

module.exports = JobListingController
