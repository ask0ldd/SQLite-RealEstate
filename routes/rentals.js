const express = require('express')
const {Rental} = require('../models/rental.model.js')
const router = express.Router()

router.get('/', async (req, res) => {
    try{
        const rental = await Rental.findOne({where :{ id : '1' }})
        //console.log(await rental.getHost())
        return res.status(200).json({...rental, host : await rental.getHost()})
    } catch (error){
        console.error('Error finding the user:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.get('/:id', async (req, res) => {
    try{
        const rental = await Rental.findOne({where:{id : parseInt(req.params.id)}});
        return res.status(200).json({...rental, host : await rental.getHost()})
    } catch (error){
        console.error('Error finding the user:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

module.exports = router