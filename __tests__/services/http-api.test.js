'use strict'

const httpApiMock = require('../../__mock__/services/http-api.mock')

describe('http-api: ', () => {
  describe('request(): ', () => {
    test('should be valid. Case where retryCount is 0. Must resolve promise with options.', () => {
      const options = {
        resolve: true,
        retryCount: 0
      }

      expect.assertions(3)
      // promiseRequestMocked function returns Promise with retries
      return httpApiMock.request(options).then(response => {
        expect(response.retries).toBe(0)
        expect(response.method).toBe('GET')
        expect(response.json).toBeTruthy()
      })
    })

    test('should be valid. Use default `retryCount` value. Must resolve promise with options.', () => {
      const options = {
        resolve: true
      }

      expect.assertions(3)
      return httpApiMock.request(options).then(response => {
        expect(response.retries).toBe(3)
        expect(response.method).toBe('GET')
        expect(response.json).toBeTruthy()
      })
    })

    test('should be invalid. Must reject promise with retries count.', () => {
      const retryCount = 5
      const options = {
        retryCount,
        method: 'POST',
        json: false,
        resolve: false
      }

      expect.assertions(3)
      return httpApiMock.request(options).catch(rejection => {
        expect(rejection.retries).toBe(0)
        expect(rejection.method).toBe('POST')
        expect(rejection.json).toBeFalsy()
      })
    })
  })

  describe('authorizedRequest(): ', () => {
    test('should be valid. Must resolve promise with object. Should have signKey and clientId props.', () => {
      const options = {
        resolve: true
      }
      const signKey = 'mock-signKey'
      const clientId = 'mock-clientId'

      expect.assertions(3)
      return httpApiMock.authorizedRequest(signKey, clientId)(options).then(response => {
        expect(typeof response).toBe('object')
        expect(response.signKey).toBe(signKey)
        expect(response.clientId).toBe(clientId)
      })
    })
  })
})
