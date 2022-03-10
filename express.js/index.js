// Create Server:
const express = require('express')
const app = express()
const dovepay_freight = express()
const port = 3000

const helmet = require('helmet')
const ejs = require('ejs')

// Default Configurations: 
const path = require('path')
const root_path = process.cwd()
const views_ext = 'html'

// Routers: 
const rtlogin = require('./rtlogin')
const rtagent = require('./rtagent')
const rtstation = require('./rtstation')
const rtsystem = require('./rtsystem')

// Install:
app.use('/dovepay-freight', dovepay_freight)

// Init Server:
dovepay_freight.set('view engine', views_ext)
dovepay_freight.set('views', path.join(root_path, 'views'))
dovepay_freight.engine(views_ext, ejs.__express)
dovepay_freight.use(express.static(path.join(root_path, 'public')))
dovepay_freight.use(helmet({
  contentSecurityPolicy: false
}))

// Import npms:
const session = require('express-session')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// Import mws:
const {initSession, checkRedisConnect, testLogin, responseDovepay} = require('./mws')
const {logErrors, clientErrorHandler, errorHandler} = require('./errHandler')

// Init Session:
const sess = initSession()
if (dovepay_freight.get('env') === 'production') {
  dovepay_freight.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
dovepay_freight.use(session(sess))
dovepay_freight.use(checkRedisConnect)

// Test login:
dovepay_freight.get('/test1', testLogin('station'))
dovepay_freight.get('/test2', testLogin('agent'))
dovepay_freight.get('/mgr', testLogin('system'))

// Link dovePay:
dovepay_freight.post('/', urlencodedParser, responseDovepay('user'))
dovepay_freight.post('/mgr', urlencodedParser, responseDovepay('system'))

// Other Routers:
dovepay_freight.use('/log', rtlogin)
dovepay_freight.use('/agent', rtagent)
dovepay_freight.use('/station', rtstation)
dovepay_freight.use('/system', rtsystem)

// Error Handler:
dovepay_freight.use(logErrors)
dovepay_freight.use(clientErrorHandler)
dovepay_freight.use(errorHandler)

// Listener: 
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})