'use strict'

const httpApiMock = require('../../__mock__/services/http-api.mock')

describe('http-api: ', () => {
  describe('request(): ', () => {
    test('should be valid. Must resolve promise with object.', () => {
      const options = {
        data: 'mock-data'
      }

      expect.assertions(1)
      return httpApiMock.request(options).then(response => expect(typeof response).toBe('object'))
    })

    test('should be invalid. Must reject promise with object.', () => {
      const fakeOptions = {
        retryCount: 5
      }

      expect.assertions(1)
      return httpApiMock.request(fakeOptions).catch(rejection => expect(typeof rejection).toBe('object'))
    })
  })

  describe('authorizedRequest(): ', () => {
    test('should be valid. Must resolve promise with object.', () => {
      const options = {
        data: 'mock-data'
      }
      const signKey = 'mock-signKey'
      const clientId = 'mock-clientId'

      expect.assertions(1)
      return httpApiMock.authorizedRequest(signKey, clientId)(options).then(response => expect(typeof response).toBe('object'))
    })
  })
})
