// @flow
'use strict'

const Promise = require('bluebird')
const promiseRequest = require('request-promise')

/**
 * @param {Object} options - Request options.
 * @param {number} retries - Count of retries if there is error while sending request.
 * @param {number} delay - Delay between retries.
 * @returns {Promise}
 * @description - Sends request with given `options`.
 *  If there is error while sending the request, it tries `retries` times with given `delay` between retries.
 */
const retryRequest = (options: Object, retries: number, delay: number) => {
  return promiseRequest(options)
    .catch((err: Error) => {
      if (retries > 0) {
        return Promise.delay(delay * 1000).then(() => retryRequest(options, retries - 1, delay))
      } else {
        return Promise.reject(err)
      }
    })
}

module.exports = retryRequest
