/*  */
'use strict'

const Promise = require('bluebird')
const AuthService = require('service-auth')
const promiseRequest = require('request-promise')

/**
 * @param {Object} options - Request options.
 * @param {number} retries - Count of retries if there is error while sending request.
 * @param {number} delay - Delay between retries.
 * @returns {Promise}
 * @description - Sends request with given `options`.
 *  If there is error while sending the request, it tries `retries` times with given `delay` between retries. 
 */
const retryRequest = (options, retries, delay) => {
  return promiseRequest(options)
    .catch((err) => {
      if (retries > 0) {
        return Promise.delay(delay * 1000).then(() => retryRequest(options, retries - 1, delay))
      } else {
        return Promise.reject(err)
      }
    })
}

/**
 * @param {object} options
 * @param {string} options.uri
 * @param {number} [options.retryCount = 3]
 * @param {number} [options.retryDelay = 2]
 * @param {string} [options.method = 'GET']
 * @param {boolean} [options.json = true]
 * @returns {Promise}
 * @description - Makes request with given options.
 *  In case of connection failure tries `retryCount` times after `retryDelay` intervals.
 *  `retryDelay` multiplayed by 1000 to get seconds.
 */
const request = (options) => {
  const _options = Object.assign({}, options)

  const retryCount = _options.retryCount || (_options.retryCount === 0 ? 0 : 3)
  const retryDelay = _options.retryDelay || 2
  _options.method = _options.method || 'GET'
  if (typeof _options.json === 'undefined') _options.json = true

  return retryRequest(_options, retryCount, retryDelay)
}

/**
 * @param {string} signKey
 * @param {string} clientId
 * @returns {function(object)} - Returns function which gets `options` object and returns Promise.
 * @description - Makes authorized request with given signKey, clientId, and options.
 *  In case of connection failure tries `retryCount` times after `retryDelay` intervals.
 */
const authorizedRequest = (signKey, clientId) => {
  return (options) => {
    const finalOptions = AuthService.setAuthorization(options, signKey, clientId)

    return request(finalOptions)
  }
}

module.exports = {
  request,
  authorizedRequest
}

module.exports.__tests__ = { retryRequest }
