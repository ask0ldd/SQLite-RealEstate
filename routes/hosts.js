const express = require('express')
const Host = require('../models/host.model.js')
const router = express.Router()
const hostCtrl = require ('../controllers/host.ctrl.js')

router.get('/', hostCtrl.getAllHosts)
router.get('/:id', hostCtrl.getHostById)
router.post('/', hostCtrl.postHost)

module.exports = router