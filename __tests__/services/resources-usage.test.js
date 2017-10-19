const resourceUsage = require('../../src/services/resource-usage')

test('getBusyMemoryPercentage function test', () => {
  expect(typeof resourceUsage.__test__.getBusyMemoryPercentage()).toBe('number')
  expect(resourceUsage.__test__.getBusyMemoryPercentage()).toBeLessThanOrEqual(100)
  expect(resourceUsage.__test__.getBusyMemoryPercentage()).toBeGreaterThanOrEqual(0)
})

describe('async function tests', () => {
  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
  })
  
  it('should getCpuBusyLoad', () => {
    expect.assertions(1);
    return resourceUsage.__test__.getCpuBusyLoad(200).then((load) => expect(typeof load).toBe('number'))
  })
  
  it('should statisticsGetter', () => {
    expect.assertions(2);
    return resourceUsage.__test__.statisticsGetter(200)
    .then((stat) => {
      expect(typeof stat.cpuLoad).toBe('number')
      expect(typeof stat.busyMemory).toBe('number')
    })
  })
})

