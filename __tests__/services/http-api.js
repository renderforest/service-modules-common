const lib = require('../../dist/services/http-api')

test('Testing esiminch', () => {
  expect(lib.request).toBeDefined()
})
