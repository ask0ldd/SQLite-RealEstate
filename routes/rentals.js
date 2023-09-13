const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')

const rentalCtrl = require ('../controllers/rental.ctrl.js')

router.get('/', rentalCtrl.getAllRentals)
router.post('/filtered', rentalCtrl.getFilteredRentals)
router.get('/:id', rentalCtrl.getRentalById)
router.put('/:id', verifyToken, rentalCtrl.updateRentalById)
// router.post('/picture/upload', rentalCtrl.savePicture) // verify token ?

module.exports = router

/*

function getHackathonRoles(role) {
    console.log(role);
    return function(req, res, next) {
        // do something with the role variable
        // send a response using res.status(...).json(...)
    });
}

router.route('/:id/organisers').get(getHackathonRoles('organiser'));
router.route('/:id/volunteer').get(getHackathonRoles('volunteer'));

*/