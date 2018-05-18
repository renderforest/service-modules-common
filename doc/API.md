# API 
 
## ResourceUsage

#### resourcesUsage(interval, count). 

 * Interval is a total time in which you want to check statistics. 
 * Count is call quantity in given interval. 
 * Returns promise.

  ``` javascript
    const ResourceUsage = require('service-modules-common').ResourceUsage
  
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


## HttpApi

#### request(...)

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

#### authorizedRequest(...)

 * Takes `signKey`, `clientId` and returns a function.
 * The returned function takes `options`, sets authorization and reuses the above API (`request()`) to request with given
 options.
 * Due to the reuse of above `request()` API, it supports the same defaults for `options`.
 
  ``` javascript
    const HttpApi = require('service-modules-common').HttpApi

    const AuthorizedRequest = HttpApi.authorizedRequest(signKey, clientId)
    
    
    const options = {
      ...
    }
    AuthorizedRequest(options).then().catch()
  ```