const express = require('express')
const {Rental, Picture, Tag, Equipment} = require('../models/rental.model.js')
const Host = require('../models/host.model.js')
const router = express.Router()

const rentalCtrl = require ('../controllers/rental.ctrl.js')

router.get('/', rentalCtrl.getAllRentals)
router.get('/:id', rentalCtrl.getRentalById)
router.put('/:id', rentalCtrl.updateRentalById)
router.post('/picture/upload', rentalCtrl.savePicture)

module.exports = router