/* @flow */
'use strict'

const Promise = require('bluebird')

/**
 * 
 * @param {object} options 
 * @param {number} signKey 
 * @param {number} clientId
 * @returns {object} - Assigned singnKey, clientId to it.
 * @description Assiging signKey and clientId to options object(mocked). 
 */
const AuthServiceMocked = (options, signKey, clientId) => {
  return {
    ...options,
    signKey: signKey,
    clientId: clientId 
  }
}

/**
 * 
 * @param {object} options
 * @returns {Promise} Resolved or rejected.
 * @description If options object have data property, then returns Promise resolve, else rejets it. 
 */
const promiseRequestMocked = (options) => {
  return options.data? Promise.resolve(options) : Promise.reject(options) 
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
function request (options: HttpAPIRequestOptions) {
  const _options = Object.assign({}, options)

  // set defaults
  const retryCount = _options.retryCount || (_options.retryCount === 0 ? 0 : 1)
  const retryDelay = _options.retryDelay || 2
  _options.method = _options.method || 'GET'

  if (typeof _options.json === 'undefined') _options.json = true
  const retryRequest = (options, retries) => {
    return promiseRequestMocked(options)
      .catch((err: Error) => {
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
