module.exports = (options) =>
  options.resolved ? Promise.resolve(options) : Promise.reject(options)
