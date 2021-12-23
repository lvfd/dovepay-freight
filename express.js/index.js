// Create Server:
const express = require('express')
const app = express()
const dovepay_freight = express()
const port = 3000

// Init Helmet:
const helmet = require('helmet')

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

// Urls:
const { urls } = require('./config')

// Use Helmet:
dovepay_freight.use(helmet({
  contentSecurityPolicy: false
}))

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
// Test code:
dovepay_freight.get('/', (req, res) => {
  let params = {
    userId: '516171584@qq.com',
    urls: urls,
    pagefor: 'user',
    title: '用户参数'
  }
  res.render('demoindex', params)
})
dovepay_freight.get('/mgr', (req, res) => {
  let params = {
    userId: '516171584@qq.com',
    urls: urls,
    pagefor: 'system',
    title: '系统商参数'
  }
  res.render('demoindex', params)
})

// Link dovePay:
const Jssm4 = require('jssm4')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
dovepay_freight.post('/', (req, res) => {
  const key = 'FA171555405706F73D7B973DB89F0B47'
  const sm4 = new Jssm4(key)
  let userId = ''
  try {
    const userId_raw = req.body.userId
    userId = sm4.decryptData_ECB(userId_raw)
  } catch (error) {
    console.log(error)
    res.send(error)
  }
  if (!userId) return;
  const params = {
    userId: userId,
    urls: urls,
    pagefor: 'user',
    title: '用户参数'
  }
  res.render('demoindex', params)
})
dovepay_freight.post('/mgr', (req, res) => {
  const key = 'FA171555405706F73D7B973DB89F0B47'
  const sm4 = new Jssm4(key)
  let userId = ''
  try {
    const userId_raw = req.body.userId
    userId = sm4.decryptData_ECB(userId_raw)
  } catch (error) {
    console.log(error)
    res.send(error)
  }
  if (!userId) return;
  const params = {
    userId: userId,
    urls: urls,
    pagefor: 'system',
    title: '系统商参数'
  }
  res.render('demoindex', params)
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