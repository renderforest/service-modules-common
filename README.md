# service-modules-common

## Resource Usage API

ResourceUsage.resourcesUsage(interval, count). 

Interval is total time in wich you want resoucesUsage function to check statistics. Count is call quantity in given interval. 
Returns promise wich contains: 

  ```
  {
    cpuLoadPercentage: number
    busyMemoryPercentage: number
  }
  ```
 
## Logger API

#### Default logger ####
  ```$xslt
    const logger = require('service-modules-common').Logger.Default
    
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
    - SERVICE_DEFAULT_LOGGER_LEVEL - Supported values (silent, error, warn, info*, verbose, debug, silly)

  Note, * marks as default.
