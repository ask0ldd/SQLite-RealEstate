const express = require('express')
const router = express.Router()

const rentalCtrl = require ('../controllers/rental.ctrl.js')

router.get('/', rentalCtrl.getAllRentals)
router.get('/:id', rentalCtrl.getRentalById)
router.put('/:id', rentalCtrl.updateRentalById)
router.post('/picture/upload', rentalCtrl.savePicture)

module.exports = router