const resourceUsage = require('../../dist/services/resource-usage')

test('getBusyMemoryPercentage function test', () => {
  expect(typeof resourceUsage.__test__.getBusyMemoryPercentage()).toBe('number')
  expect(resourceUsage.__test__.getBusyMemoryPercentage()).toBeLessThanOrEqual(100)
  expect(resourceUsage.__test__.getBusyMemoryPercentage()).toBeGreaterThanOrEqual(0)
})

test('getCpuBusyLoad function test', (done) => {
  expect.assertions(1);
  return resourceUsage.__test__.getCpuBusyLoad(4000).then((load) => expect(typeof load).toBe('number'))
})