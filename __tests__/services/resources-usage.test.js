'use strict'

const resourceUsage = require('../../src/services/resource-usage')

test('getBusyMemoryPercentage function test.', () => {
  expect(typeof resourceUsage.__test__.getBusyMemoryPercentage()).toBe('number')
  expect(resourceUsage.__test__.getBusyMemoryPercentage()).toBeLessThanOrEqual(100)
  expect(resourceUsage.__test__.getBusyMemoryPercentage()).toBeGreaterThanOrEqual(0)
})

describe('async function tests.', () => {
  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
  })

  it('should getCpuBusyLoad', () => {
    expect.assertions(1)
    return resourceUsage.__test__.getCpuBusyLoad(200).then((load) => expect(typeof load).toBe('number'))
  })

  it('should test statisticsGetter function.', () => {
    expect.assertions(2)
    return resourceUsage.__test__.statisticsGetter(200)
      .then((stat) => {
        expect(typeof stat.cpuLoad).toBe('number')
        expect(typeof stat.busyMemory).toBe('number')
      })
  })

  it('should check if statisticsGetter function returns object.', () => {
    expect.assertions(1)
    return resourceUsage.__test__.statisticsGetter(200)
      .then((stat) => {
        expect(typeof stat).toBe('object')
      })
  })

  it('should test intervalRunner function.', () => {
    const fn = () => Promise.resolve(0)

    expect.assertions(1)
    return resourceUsage.__test__.intervalRunner(fn, 100, 5)
      .then((arr) => expect(arr).toEqual([0, 0, 0, 0, 0]))
  })

  it('should test intervalRunner function in case of count <= 0.', () => {
    const fn = () => Promise.resolve(0)

    expect.assertions(1)
    return resourceUsage.__test__.intervalRunner(fn, 100, 0)
      .then((arr) => expect(arr).toEqual([]))
  })

  it('should check if resourcesUsage function returns object.', () => {
    expect.assertions(1)
    return resourceUsage.resourcesUsage(100, 5)
      .then((resourceUsage) => expect(typeof resourceUsage).toBe('object'))
  })

  it('should test resourcesUsage function.', () => {
    expect.assertions(2)
    return resourceUsage.resourcesUsage(100, 5)
      .then((resourceUsage) => {
          expect(typeof resourceUsage.busyMemoryPercentage).toBe('number')
          expect(typeof resourceUsage.cpuLoadPercentage).toBe('number')
        }
      )
  })
})

test('cpuAverage function test.', () => {
  expect(typeof resourceUsage.__test__.cpuAverage()).toBe('object')
  expect(typeof resourceUsage.__test__.cpuAverage().idle).toBe('number')
  expect(typeof resourceUsage.__test__.cpuAverage().total).toBe('number')
})

test('arrayAverage function test.', () => {
  const testArray = [
    {
      cpuLoad: 1,
      busyMemory: 200
    },
    {
      cpuLoad: 2,
      busyMemory: 400
    },
    {
      cpuLoad: 3,
      busyMemory: 600
    }
  ]
  const emptyArray = []
  const resultForTestArray = {
    cpuLoadPercentage: 2,
    busyMemoryPercentage: 400
  }
  const resultForEmptyArray = {
    cpuLoadPercentage: 0,
    busyMemoryPercentage: 0
  }

  expect(resourceUsage.__test__.arrayAverage(testArray)).toEqual(resultForTestArray)
  expect(resourceUsage.__test__.arrayAverage(emptyArray)).toEqual(resultForEmptyArray)
})
