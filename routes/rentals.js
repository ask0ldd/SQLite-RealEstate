const express = require('express')
const Rental = require('../models/rental.model.js')
const router = express.Router()

router.get('/', async (req, res) => {
    try{
        const rental = await Rental.findAll({where :{ id : '1' }})
        return res.status(200).json(rental, rental.getHost())
    } catch (error){
        console.error('Error finding the user:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

module.exports = router