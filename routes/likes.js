const express = require('express')
const router = express.Router()
const rentalCtrl = require ('../controllers/rental.ctrl.js')

router.get('/likesList/:userId', rentalCtrl.getUserLikesList)
router.post('/like', rentalCtrl.switchLike)

module.exports = router