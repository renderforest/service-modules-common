const lib = require('../../__mock__/services/http-api.mock')

test('Testing TBD', () => {
  expect(lib.request).toBeDefined()
  expect(lib.authorizedRequest).toBeDefined()
})

describe('testing async functions.', () => {
  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000
  })

  it('should test request function.', () => {
    const options = {
      data: 'google.com'
    }

    expect.assertions(1)
    return lib.request(options).then(res => expect(typeof res).toBe('object'))
  })

  it('should test request function retry case.', () => {
    const fakeOptions = {
      retryCount: 5
    }

    expect.assertions(1)
    return lib.request(fakeOptions).catch(rej => expect(typeof rej).toBe('object'))
  })

  it('authorizedRequest function test.', () => {
    const options = {
      data: 'google.com'
    }
    const signKey = 1234
    const clientId = 4321

    expect.assertions(1)
    return lib.authorizedRequest(signKey, clientId)(options).then(response => expect(typeof response).toBe('object'))
  })
})
