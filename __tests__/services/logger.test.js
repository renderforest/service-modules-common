'use strict'

const logger = require('../../src/services/logger')

describe('logger: ', () => {
  describe('logger(): ', () => {
    test('test silly logger.', () => {
      expect(logger.Default.silly).toBeDefined()
      expect(typeof logger.Default.silly).toBe('function')
    })

    test('test debug logger.', () => {
      expect(logger.Default.debug).toBeDefined()
      expect(typeof logger.Default.debug).toBe('function')
    })

    test('test verbose logger.', () => {
      expect(logger.Default.verbose).toBeDefined()
      expect(typeof logger.Default.verbose).toBe('function')
    })

    test('test info logger.', () => {
      expect(logger.Default.info).toBeDefined()
      expect(typeof logger.Default.info).toBe('function')
    })

    test('test warn logger.', () => {
      expect(logger.Default.warn).toBeDefined()
      expect(typeof logger.Default.warn).toBe('function')
    })

    test('test error logger.', () => {
      expect(logger.Default.error).toBeDefined()
      expect(typeof logger.Default.error).toBe('function')
    })
  })
})
