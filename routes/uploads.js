const express = require('express')
const router = express.Router()

const multer = require('../middlewares/multer.js')
const rentalCtrl = require ('../controllers/rental.ctrl.js')

router.post('/', multer, rentalCtrl.savePicture)

module.exports = router