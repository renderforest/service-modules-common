'use strict'

const Promise = require('bluebird')

const { RateLimitExceededError } = require('../utils/errors')

module.exports = {
  /**
   * @param {Object} redis - Promisified `Redis` instance.
   * @param {Object} options - Request limit count for each method and expiring period.
   * @param {{GET: number, POST: number, PUT: number, DELETE: number}} options.THRESHOLD
   * @param {number} options.EXPIRE
   * @returns {Function}
   * @description Builds `redisKey` from given options. Increments the number stored at given `redisKey` by one.
   *  If there is no such `redisKey` it creates and sets expire time. If incremented number which is stored at given
   *  `redisKey` is greater than current `THRESHOLD` rejects with Error. In each case it sets 'x-rate-limit' and
   *  'x-rate-limit-remaining' in res.headers.
   */
  checkAbuseUser: (redis, options) => {
    return (req, res, next) => {
      const method = req.method
      const REQUEST_THRESHOLD = options.THRESHOLD[method]

      const ip = req.headers['cf-connecting-ip'] || req.connection.remoteAddress || req.socket.remoteAddress
      const trimmedIp = ip.substr(0, ip.lastIndexOf('.'))

      const userId = req.user.id

      const timestamp = new Date()
      const expiringPeriod = options.EXPIRE
      const timeFraction = timestamp - (timestamp % expiringPeriod)

      const redisKey = `${timeFraction}:${trimmedIp}:${userId}:${method}`

      redis.incrAsync(redisKey)
        .then((incrementedResult) => {
          if (incrementedResult === 1) {
            return redis.expireAsync(redisKey, expiringPeriod)
              .thenReturn(incrementedResult)
          } else if (incrementedResult > REQUEST_THRESHOLD) {
            return Promise.reject(new RateLimitExceededError('Request rate limit has been reached.'))
          } else {
            return incrementedResult
          }
        })
        .then((incrementedResult) => {
          const requestsRemain = REQUEST_THRESHOLD - incrementedResult
          res.set({
            'x-rate-limit': REQUEST_THRESHOLD,
            'x-rate-limit-remaining': requestsRemain
          })

          next()
        })
        .catch(next)
    }
  }
}
