module.exports = (options, retries, delay) => {
  const result = {}
  Object.assign(result, options, { retries, delay })

  return Promise.resolve(result)
}
