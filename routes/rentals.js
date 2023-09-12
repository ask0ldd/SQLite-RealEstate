const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')

const rentalCtrl = require ('../controllers/rental.ctrl.js')

router.get('/', rentalCtrl.getAllRentals)
router.get('/:id', rentalCtrl.getRentalById)
router.put('/:id', verifyToken, rentalCtrl.updateRentalById)
router.post('/picture/upload', rentalCtrl.savePicture) // verify token ?

module.exports = router