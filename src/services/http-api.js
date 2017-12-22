// @flow
'use strict'

const AuthService = require('service-auth')

const retryRequest = require('../utils/retry-request')

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
const request = (options: HttpAPIRequestOptions) => {
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
const authorizedRequest = (signKey: string, clientId: string) => {
  return (options: Object) => {
    const finalOptions = AuthService.setAuthorization(options, signKey, clientId)

    return request(finalOptions)
  }
}

module.exports = {
  request,
  authorizedRequest
}
