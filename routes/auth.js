const express = require('express')
const User = require('../models/user.model.js')
const router = express.Router()
const authCtrl = require ('../controllers/auth.ctrl.js')

router.post('/login', authCtrl.log)

module.exports = router