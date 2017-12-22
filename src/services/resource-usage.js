// @flow
'use strict'

const os = require('os')
const Promise = require('bluebird')

/**
 * @returns {number} - Busy memory (buffer/cache included) percentage.
 * @description Gets busy memory percentage.
 */
const getBusyMemoryPercentage = () => 100 - (os.freemem() / os.totalmem() * 100)

/**
 * @returns {object} - Object that contains cpu's idle mode time average and cpu's mode total time average.
 * @description Looking up cpu's modes for calculating idle mode time average and mode's total time and returns
 *  object with two properties idle and total.
 */
const cpuAverage = () => {
  const cpus = os.cpus()

  const addTwoNumbers = (num1: number, num2: number) => num1 + num2

  const cpuModesSum = (core): number => Object.keys(core.times).map(key => core.times[key]).reduce(addTwoNumbers, 0)

  const cpuIdleMode = (core): number => core.times.idle

  const totalTime = cpus.reduce((_totalTime, core) => _totalTime + cpuModesSum(core), 0)

  const idleModeTime = cpus.reduce((idleModeTime, core) => idleModeTime + cpuIdleMode(core), 0)

  return ({
    idle: idleModeTime / cpus.length,
    total: totalTime / cpus.length
  }: TCpuAverage)
}

/**
 * @param .. TODO: fix this
 * @return {object} - ..
 * @description ..
 */
const arrayAverage = (array: TArrayAverageArg) => {
  const cpuLoadSum = array.reduce((sum, current) => {
    return sum + current.cpuLoad
  }, 0)
  const busyMemorySum = array.reduce((sum, current) => {
    return sum + current.busyMemory
  }, 0)
  return array.length !== 0 ? {
    cpuLoadPercentage: Number((cpuLoadSum / array.length).toFixed(3)),
    busyMemoryPercentage: Number((busyMemorySum / array.length).toFixed(3))
  } : {
    cpuLoadPercentage: 0,
    busyMemoryPercentage: 0
  }
}

/**
 * @param {number} delay - Delay between cpu load measures
 * @returns {Promise.<number>} - Cpu's current load
 * @description Asynchronously measures cpu's state, calculates difference between two measures and gets cpu busy load.
 */
const getCpuBusyLoad = (delay: number) => {
  return Promise.resolve().delay(delay).then(() => cpuAverage())
    .then((startMeasure: TCpuAverage) => {
      const endMeasure = cpuAverage()
      const idleDifference = endMeasure.idle - startMeasure.idle
      const totalDifference = endMeasure.total - startMeasure.total
      return totalDifference === 0 ? 0 : 100 - (100 * idleDifference / totalDifference)
    })
}

/**
 * @param {number} delay - Delay between cpu load measures
 * @returns {object} - Object that contains cpuLoad and busyMemory
 * @description Calls getBusyMemoryPercentage function to get busy memory and
 *  getCpuBusyLoad function to get cpu's load
 *  Returns object with two properties cpuLoad and busyMemory
 */
const statisticsGetter = (delay: number) => {
  const busyMemory = getBusyMemoryPercentage()
  return getCpuBusyLoad(delay).then((cpuLoad: number) => {
    return {
      cpuLoad: cpuLoad,
      busyMemory: busyMemory
    }
  })
}

/**
 *
 * @param {function} fn - The function that must be called
 * @param {number} interval - Time between function calls
 * @param {number} count - Function's call count
 * @param {[array]} arr - Array for collecting the results (optional)
 * @return {Promise} - Promise which contains array of given function's results
 * @description Recursively calls given function with given interval between function calls.
 *  Collects given function's results in array
 */
const intervalRunner = (fn: Function, interval: number, count: number, arr?: Array<mixed> = []) => {
  if (count <= 0) {
    return Promise.resolve(arr)
  }

  return fn().then(res => {
    return Promise.delay(interval).then(() => intervalRunner(fn, interval, count - 1, [...arr, res]))
  })
}

/**
 *
 * @param {number} interval - Time between statisticsGetter function calls
 * @param {number} count - Statistics getter function's call count
 * @returns {object} - Object that contain two properties: cpuLoadPercentage, busyMemoryPercentage
 * @description Calls intervalRunner function with statisticsGetter function, interval and count as argument
 *  for getting array of cpu load and busy memory load measures. Then computes average of measures.
 */
const resourcesUsage = (interval: number, count: number) => {
  const timeBetweenMeasures = Math.floor(interval / count)
  return intervalRunner(() => statisticsGetter(timeBetweenMeasures), timeBetweenMeasures, count).then(arrayAverage)
}

module.exports = {
  resourcesUsage,
  __tests__: {
    getBusyMemoryPercentage,
    getCpuBusyLoad,
    statisticsGetter,
    intervalRunner,
    arrayAverage,
    cpuAverage
  }
}
