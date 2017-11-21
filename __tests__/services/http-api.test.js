'use strict'

jest.mock('request-promise')
jest.mock('../../src/utils/retry-request', () => require('../../__mocks__/retry-request'))

const httpApi = require('../../src/services/http-api')

describe('http api: ', () => {
  // `default` property in options` object is for `retry-request` module mock.

  describe('request(): ', () => {
    test('should be valid. In case of there is default values for `retryCount`, `retryDelay`, `method`, `json`.', () => {
      const options = {
        default: false,
        retryCount: 'mock-retryCount',
        retryDelay: 'mock-retryDelay',
        method: 'mock-method',
        json: 'mock-json'
      }

      expect.assertions(3)
      return httpApi.request(options).then(result => expect(result).toEqual(options))
    })

    test('should be valid. In case of there is no default values for `retryCount`, `retryDelay`, `method`, `json`.', () => {
      const options = {
        default: true
      }
      const expectedValue = {
        default: true,
        json: true,
        method: 'GET'
      }

      expect.assertions(3)
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
        retryCount: 0
      }

      expect.assertions(3)
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
