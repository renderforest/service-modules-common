'use strict'

const Promise = require('bluebird')

/**
 * @param {object} options
 * @param {string} signKey
 * @param {string} clientId
 * @returns {object} - Assigned singKey, clientId to it.
 * @description Assigning signKey and clientId to options object(mocked).
 */
const AuthServiceMocked = (options, signKey, clientId) => {
  return Object.assign({}, options, { signKey, clientId })
}

/**
 * @param {object} options
 * @param {number} retries
 * @returns {Promise} Resolved or rejected.
 * @description If options object have truthy resolve property, then returns Promise resolve, else rejects it.
 */
const promiseRequestMocked = (options, retries) => {
  const optionsWithRetries = Object.assign({}, options, { retries })

  return options.resolve === true ? Promise.resolve(optionsWithRetries) : Promise.reject(optionsWithRetries)
}

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
 */
function request (options) {
  const _options = Object.assign({}, options)

  // set defaults
  const retryCount = _options.retryCount || (_options.retryCount === 0 ? 0 : 3)
  const retryDelay = _options.retryDelay || 2
  _options.method = _options.method || 'GET'

  if (typeof _options.json === 'undefined') _options.json = true
  const retryRequest = (options, retries) => {
    return promiseRequestMocked(options, retries)
      .catch((err) => {
        if (retries > 0) {
          return Promise.delay(retryDelay).then(() => retryRequest(options, retries - 1))
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
    const finalOptions = AuthServiceMocked(options, signKey, clientId)

    return request(finalOptions)
  }
}

module.exports = {
  request,
  authorizedRequest
}
