const express = require('express')
const Owner = require('../models/owner.model.js')
const router = express.Router()

router.get('/', (req, res) => {
    try{
        return res.status(200).json({id:'1', router:'owners', name:'doe', firstname:'john'})
    } catch (error){
        console.error('Error finding the user:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

module.exports = router