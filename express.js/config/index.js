const urls = require('./urls')
const sm4keys = {
  test: {
    freight_user: 'Fa3HGo1AW2GN8zWS',
    freight_system: 'Fa3HGo1AW2GN8zWS'
  },
  prod: {
    freight_user: '',
    freight_system: ''
  }
}
const redisConfig = {
  rootNodes: [
    { host: '10.1.85.160', port: 7000 },
    { host: '10.1.85.160', port: 7001 },
    { host: '10.1.85.160', port: 7002 },
    { host: '10.1.85.160', port: 7003 },
    { host: '10.1.85.160', port: 7004 },
    { host: '10.1.85.160', port: 7005 }
  ],
  password: 'Acca@1234'
}
const cookieConfig = {
  name: 'dovepay.connect.sid'
}

module.exports = {
  urls, sm4keys, redisConfig, cookieConfig
}