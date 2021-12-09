// Create Server:
const express = require('express')
const app = express()
const dovepay_freight = express()
const port = 3000

// Create Assets:
const ejs = require('ejs')
const session = require('express-session')

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

// Init Session:
let sess = {
  name: 'dovepay.connect.sid',
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {}
}
if (dovepay_freight.get('env') === 'production') {
  dovepay_freight.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
dovepay_freight.use(session(sess))

// Routers: 
dovepay_freight.get('/', (req, res) => {
  res.render('demoindex')
})
dovepay_freight.use('/log', rtlogin)
dovepay_freight.use('/agent', rtagent)
dovepay_freight.use('/station', rtstation)
dovepay_freight.use('/system', rtsystem)

// app.use(logErrors)
// app.use(clientErrorHandler)
// app.use(errorHandler)

// Listener: 
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})