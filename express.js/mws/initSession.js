module.exports = () => {
  const { redisConfig, cookieConfig } = require('../config')
  const session = require('express-session')
  const Redis = require('ioredis')
  let RedisStore = require('connect-redis')(session)
  const redisCluster = new Redis.Cluster(redisConfig.rootNodes, {
    redisOptions: {
      password: redisConfig.password
    }
    ,keyPrefix: "DOVEFREIGHT:"
  })
  return {
    store: new RedisStore({ 
      client: redisCluster,
      prefix: 'SESS:'
    }),
    name: cookieConfig.name,
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {}
  }
}