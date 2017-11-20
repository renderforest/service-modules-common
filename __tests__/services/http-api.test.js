'use strict'

jest.mock('request-promise')

const httpApi = require('../../src/services/http-api')

describe('http api: ', () => {
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
      return httpApi.__tests__.retryRequest(options, retries, delay).then(result => expect(result).toBe(options))
    })

    test('should be invalid. In case of request failed and `retries` is less or equal than 0.', () => {
      const options = {
        resolved: false
      }
      const retries = 0
      const delay = 1

      expect.assertions(1)
      const startTime = Date.now()
      return httpApi.__tests__.retryRequest(options, retries, delay).catch(result => {
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
      return httpApi.__tests__.retryRequest(options, retries, delay).catch(err => {
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
      return httpApi.__tests__.retryRequest(options, retries, delay).catch(result => {
        const endTime = Date.now()
        const spendTime = endTime - startTime

        // Multiplayed by 1000 to get seconds.
        const actualTime = delay * retries * 1000
        expect(spendTime - actualTime).toBeLessThanOrEqual(100)
      })
    })
  })

  describe('request(): ', () => {
    test('should be valid. In case of there is default values for `retryCount`, `retryDelay`, `method`, `json`.', () => {
      const options = {
        resolved: true,
        uri: 'mock-uri',
        retryCount: 'mock-retryCount',
        retryDelay: 'mock-retryDelay',
        method: 'mock-method',
        json: 'false'
      }

      expect.assertions(1)
      return httpApi.request(options).then(result => expect(result).toEqual(options))
    })

    test('should.', () => {
      const options = {
        resolved: true,
        uri: 'mock-uri'
      }
      const expectedValue = {
        json: true,
        resolved: true,
        method: "GET",
        uri: "mock-uri"
      }

      return httpApi.request(options).then(response => {
        expect(response).toEqual(expectedValue)
      })
    })
  })

  // describe('authorizedRequest(): ', () => {
  //   jest.mock('../../src/services/http-api', () => require('../../__mocks__/http-api'))

  //   test('should return `finalOptions`.', () => {
  //     const options = {
  //       uri: 'https://mock-mock.com?mock=mock-value',
  //       body: 'mock-body'
  //     }
  //     const signKey = 'mock-signKey'
  //     const clientId = 'mock-clientid'

  //     return httpApi.authorizedRequest(signKey, clientId)(options).then(result => expect(result).toBe(options))
  //   })
  // })
})
