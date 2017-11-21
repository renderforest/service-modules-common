module.exports = (options, retries, delay) => {
  return Promise.resolve({ ...options, retries, delay })
}
