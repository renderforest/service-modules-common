'use strict'

module.exports = (options, retries, delay) => {
  if (options.default === undefined) {
    expect(retries).toBe(0)
    expect(delay).toBe(2)
  }
  if (options.default === true) {
    expect(retries).toBe(3)
    expect(delay).toBe(2)
  }
  if (options.default === false) {
    expect(retries).toEqual('mock-retryCount')
    expect(delay).toEqual('mock-retryDelay')
  }
  return Promise.resolve(options)
}
