const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json()
const { login, logout } = require('./mws')

router.post('/login', urlencodedParser, login)
router.post('/logout', jsonParser, logout)

module.exports = router