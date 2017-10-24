/*  */
'use strict'

const Promise = require('bluebird')
const AuthService = require('service-auth')
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
 *  In case of connection failure tries `retryCount` times after `retryDelay` intervals.
 *  retryDelay multiplayed by 1000 to get seconds.
 */
function request (options) {
  const _options = Object.assign({}, options)

  // set defaults
  const retryCount = _options.retryCount || (_options.retryCount === 0 ? 0 : 3)
  const retryDelay = _options.retryDelay || 2
  _options.method = _options.method || 'GET'
  if (typeof _options.json === 'undefined') _options.json = true

  const retryRequest = (options, retries) => {
    return promiseRequest(options)
      .catch((err) => {
        if (retries > 0) {
          return Promise.delay(retryDelay * 1000).then(() => retryRequest(options, retries - 1))
        } else {
          return Promise.reject(err)
        }
      })
  }

  return retryRequest(_options, retryCount)
}

/**
 * @param {string} signKey
 * @param {string} clientId
 * @returns {function(object)} - Returns function which gets `options` object and returns Promise.
 * @description Makes authorized request with given signKey, clientId, and options.
 *  In case of connection failure tries `retryCount` times after `retryDelay` intervals.
 */
function authorizedRequest (signKey, clientId) {
  return (options) => {
    const finalOptions = AuthService.setAuthorization(options, signKey, clientId)

    return request(finalOptions)
  }
}

module.exports = {
  request,
  authorizedRequest
}
