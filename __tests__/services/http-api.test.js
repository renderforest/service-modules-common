'use strict'

jest.mock('request-promise')
jest.mock('../../src/utils/retry-request', () => require('../../__mocks__/retry-request'))

const httpApi = require('../../src/services/http-api')

describe('http api: ', () => {
  // `default` property in options` object is for `retry-request` module mock.

  describe('request(): ', () => {
    test('should be valid. Default values for `retryCount`, `retryDelay`, `method`, `json`.', () => {
      const options = {
        default: false,
        retryCount: 'mock-retryCount',
        retryDelay: 'mock-retryDelay',
        method: 'mock-method',
        json: 'mock-json'
      }
      const expectedValue = {
        default: false,
        delay: 'mock-retryDelay',
        json: 'mock-json',
        method: 'mock-method',
        retries: 'mock-retryCount',
        retryCount: 'mock-retryCount',
        retryDelay: 'mock-retryDelay'
      }

      expect.assertions(1)
      return httpApi.request(options).then(result => {
        expect(result).toEqual(expectedValue)
      })
    })

    test('should be valid. No default values for `retryCount`, `retryDelay`, `method`, `json`.', () => {
      const options = {
        default: true
      }
      const expectedValue = {
        default: true,
        delay: 2,
        json: true,
<<<<<<< HEAD
        method: 'GET',
        retries: 3
=======
        method: 'GET'
>>>>>>> d7c6bc2d46399dff193705a1ab9a508ced3bcc48
      }

      expect.assertions(1)
      return httpApi.request(options).then(response => {
        expect(response).toEqual(expectedValue)
      })
    })

    test('should be valid.', () => {
      const options = {
        retryCount: 0
      }
      const expectedValue = {
        json: true,
        method: 'GET',
<<<<<<< HEAD
        retryCount: 0,
        delay: 2,
        retries: 0
=======
        retryCount: 0
>>>>>>> d7c6bc2d46399dff193705a1ab9a508ced3bcc48
      }

      expect.assertions(1)
      return httpApi.request(options).then(response => {
        expect(response).toEqual(expectedValue)
      })
    })
  })

  describe('authorizedRequest(): ', () => {
    test('should return `finalOptions`.', () => {
      const options = {
        uri: 'https://mock-mock.com?mock=mock-value',
        body: 'mock-body',
        retryCount: 0
      }
      const signKey = 'mock-signKey'
      const clientId = 'mock-clientid'

      return httpApi.authorizedRequest(signKey, clientId)(options).then(result => {
        expect(result.headers.authorization).toBeDefined()
        expect(result.headers.clientid).toBe(clientId)
        expect(result.headers.nonce).toBeDefined()
        expect(result.headers.timestamp).toBeDefined()
      })
    })
  })
})
