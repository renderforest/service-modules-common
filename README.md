# service-modules-common
Common helpers and utilities for services.

[![Build Status](https://travis-ci.org/renderforest/service-modules-common.svg?branch=master)](https://travis-ci.org/renderforest/service-modules-common)
[![GitHub issues](https://img.shields.io/github/issues/renderforest/service-modules-common.svg)](https://github.com/renderforest/service-modules-common/issues)
[![GitHub release](https://img.shields.io/github/release/renderforest/service-modules-common.svg)](https://github.com/renderforest/service-modules-common/releases)
[![GitHub stars](https://img.shields.io/github/stars/renderforest/service-modules-common.svg)](https://github.com/renderforest/service-modules-common/stargazers)

[![Dep](https://img.shields.io/david/renderforest/service-modules-common.svg)](https://david-dm.org/renderforest/service-modules-common)
[![DevDep](https://img.shields.io/david/dev/renderforest/service-modules-common.svg)](https://david-dm.org/renderforest/service-modules-common?type=dev)

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
  
# Development
In case you add new third party dependencies, use flow-typed npm package to add annotations for that packages.
 * npm i -g flow-typed
 * flow-typed install --ignoreDeps dev
