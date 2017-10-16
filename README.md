# service-modules-common
Common helpers and utilities for services.
 
## ResourceUsage

ResourceUsage.resourcesUsage(interval, count). 

Interval is total time in wich you want resoucesUsage function to check statistics. Count is call quantity in given interval. 
Returns promise wich contains: 

  ```
  {
    cpuLoadPercentage: number
    busyMemoryPercentage: number
  }
  ```
 
## Logger

#### Default logger
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


## HttpApi API

Makes request with given options. In case of connection failure, tries `retryCount` times after `retryDelay` intervals.
 
Defaults
 * retryCount - 3
 * retryDelay - 2 (in seconds)
 * method - 'GET'
 * json - true
 
  ``` javascript
    const HttpApi = require('service-modules-common').HttpApi
  
    const options = {
      ...
    }
    
    HttpApi.request(options).then().catch() 
  ```
