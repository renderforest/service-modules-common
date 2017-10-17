/* @flow */
'use strict'

const Promise = require('bluebird')
const promiseRequest = require('request-promise')

/**
 * @param {object} options
 * @param {string} options.uri
 * @param {number} [options.retryCount = 3]
 * @param {number} [options.retryDelay = 2]
 * @param {string} [options.method = 'GET']
 * @param {boolean} [options.json = true]
 * @returns {Promise}
 * @description Makes request with given options.
 *  In case of connection failure try `retryCount` times after `retryDelay` intervals.
 */
function request (options: HttpAPIRequestOptions) {
  const _options = Object.assign({}, options)

  // set defaults
  const retryCount = _options.retryCount || 3
  const retryDelay = _options.retryDelay || 2
  _options.method = _options.method || 'GET'
  if (typeof _options.json === 'undefined') _options.json = true

  const retryRequest = (options, retries) => {
    return promiseRequest(options)
      .catch((err: Error) => {
        if (retries > 0) {
          return Promise.delay(retryDelay * 1000).then(() => retryRequest(options, retries - 1))
        } else {
          return Promise.reject(err)
        }
      })
  }

  return retryRequest(_options, retryCount)
}

module.exports = {
  request
}
