'use strict'

jest.mock('request-promise')

const retryRequest = require('../../src/utils/retry-request')

describe('utils/retry-request: ', () => {
  /* In options `resolved` flag is for mocked `request-promise` module. 
  If `resolved` flag is true, request will be resolved, otherwise will be rejected with Error. */

  describe('retryRequest(): ', () => {
    test('should be valid. In case of request succeeded.', () => {
      const options = {
        resolved: true
      }
      const retries = 3
      const delay = 2

      expect.assertions(1)
      return retryRequest(options, retries, delay).then(result => expect(result).toBe(options))
    })

    test('should be invalid. In case of request failed and `retries` is less or equal than 0.', () => {
      const options = {
        resolved: false
      }
      const retries = 0
      const delay = 1

      expect.assertions(1)
      const startTime = Date.now()
      return retryRequest(options, retries, delay).catch(result => {
        const endTime = Date.now()
        const spendTime = endTime - startTime

        // Multiplayed by 1000 to get seconds.
        const actualTime = delay * retries * 1000
        expect(spendTime - actualTime).toBeLessThanOrEqual(100)
      })
    })

    test('should be invalid. In case of request failed should reject with `options`.', () => {
      const options = {
        resolved: false
      }
      const retries = 0
      const delay = 1

      expect.assertions(1)
      return retryRequest(options, retries, delay).catch(err => {
        expect(err).toBe(options)
      })
    })

    test('should be invalid. In case of request failed.', () => {
      const options = {
        resolved: false
      }
      const retries = 4
      const delay = 1

      expect.assertions(1)
      const startTime = Date.now()
      return retryRequest(options, retries, delay).catch(result => {
        const endTime = Date.now()
        const spendTime = endTime - startTime

        // Multiplayed by 1000 to get seconds.
        const actualTime = delay * retries * 1000
        expect(spendTime - actualTime).toBeLessThanOrEqual(100)
      })
    })
  })
})
