# API 
 

## ResourceUsage

#### resourcesUsage(interval, count). 

 * Interval is a total time in which you want to check statistics. 
 * Count is call quantity in given interval. 
 * Returns promise.

  ```javascript
    const ResourceUsage = require('@renderforest/service-modules-common').ResourceUsage 
  
    ResourceUsage.resourcesUsage(interval, count).then((result) => {
      
      /**
       * result -> 
       *    { cpuLoadPercentage: number
       *      busyMemoryPercentage: number }
       */
    }).catch() 
  ```
 

## Logger

#### Default logger
  ```javascript
    const logger = require('@renderforest/service-modules-common').Logger.Default
    
    logger.error()
    logger.warn()
    logger.info()
    logger.verbose()
    logger.debug()
    logger.silly()
  ```    
  
* Levels
   - error: 0,
   - warn: 1,
   - info: 2,
   - verbose: 3,
   - debug: 4,
   - silly: 5  
  
 
* Environment variables:
    - `SERVICE_DEFAULT_LOGGER_LEVEL`- Supported values (silent, error, warn, info*, verbose, debug, silly)

  Note, * marks as default.
