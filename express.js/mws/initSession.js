module.exports = async () => {
  const { redisConfig, cookieConfig } = require('../config')
  const session = require('express-session')
  const Redis = require('ioredis')
  let RedisStore = require('connect-redis')(session)
  let outputConfig = {
    name: cookieConfig.name,
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {}
  }
  const redisCluster = new Redis.Cluster(redisConfig.rootNodes, {
    redisOptions: {
      password: redisConfig.password
    }
    ,keyPrefix: "DOVEFREIGHT:"
    ,clusterRetryStrategy: (times) => {
      return
    }
    ,enableReadyCheck: true
  })
  function getConfigPromise() {
    return new Promise((resolve, reject) => {
      redisCluster.on('ready', () => {
        console.log('Redis is ready')
        outputConfig.store = new RedisStore({ 
          client: redisCluster,
          prefix: 'SESS:'
        })
        resolve(outputConfig)
      })
      ,redisCluster.on('error', err => {
        console.error(`Redis连接错误: ${err}`)
        resolve(outputConfig)
      })
    })
  }
  return await getConfigPromise()
}