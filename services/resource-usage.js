'use strict'

const os = require('os')

/**
 * @returns {number} - Free memory (buffer/cache included) percentage.
 * @description Gets free memory percentage.
 */
const getFreeMemoryPercentage = () => os.freemem() / os.totalmem() * 100

/**
 * @returns {object} - Object that contains cpu's idle mode time average and cpu's mode total time average.
 * @description Looking up cpu's modes for calculating idle mode time average and mode's total time and returns
 *  object with two properties idle and total.
 */
const cpuAverage = () => {
  let idleModeTime = 0
  let totalTime = 0
  const cpus = os.cpus()

  for (let i = 0; i < cpus.length; i++) {
    for (let mode in cpus[i].times) {
      if (cpus[i].times.hasOwnProperty(mode)) totalTime += cpus[i].times[mode]
    }
    idleModeTime += cpus[i].times.idle
  }

  return {
    idle: idleModeTime / cpus.length,
    total: totalTime / cpus.length
  }
}

/**
 * @param {number|Array} array - Array of numbers.
 * @return {number} - Average of array.
 * @description Calculating average of an array.
 */
const arrayAverage = (array) => {
  const sum = array.reduce((sum, current) => {
    return sum + current
  })
  return sum / array.length
}

/**
 * @param {number} callCount - Measuring times per interval.
 * @param {number} interval - Measuring interval in milliseconds.
 * @param {function} cb - Callback function.
 * @description Collects cpu load percentages and used memory sizes into arrays depending on interval and function
 *  call count. Calls arrayAverage function for computing average of this arrays.
 */
const resourcesUsage = (callCount, interval, cb) => {
  // cpuLoadPercs - array of cpu load percentages, usedMemorySizes - array of usedMemory percentages
  const cpuLoadPercs = []
  const usedMemorySizes = []

  const timerId = setInterval(() => {
    if (cpuLoadPercs.length < callCount) {
      // calculating cpuLoad with two measures
      const startMeasure = cpuAverage()
      setTimeout(() => {
        const endMeasure = cpuAverage()
        const idleDifference = endMeasure.idle - startMeasure.idle
        const totalDifference = endMeasure.total - startMeasure.total
        const cpuLoad = 100 - (100 * idleDifference / totalDifference)
        cpuLoadPercs.push(cpuLoad)
      }, 100)
      const memoryUsage = 100 - getFreeMemoryPercentage()
      usedMemorySizes.push(memoryUsage)
    } else {
      clearInterval(timerId)
      const stat = {
        cpuLoadPercentage: Number(arrayAverage(cpuLoadPercs).toFixed(3)),
        memoryUsagePercentage: Number(arrayAverage(usedMemorySizes).toFixed(3))
      }
      cb(null, stat)
    }
  }, interval)
}

module.exports = {resourcesUsage}
