const express = require('express')
const Owner = require('../models/owner.model.js')
const router = express.Router()

router.get('/', async (req, res) => {
    try{
        const owners = await Owner.findAll();
        console.log("All owners:", JSON.stringify(owners, null, 2));
        return res.status(200).json(owners)
    } catch (error){
        console.error('Error finding the user:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.get('/:id', async (req, res) => {
    try{
        const owner = await Owner.findOne({id : req.params.id});
        console.log("Owner:", JSON.stringify(owner, null, 2));
        return res.status(200).json(owner)
    } catch (error){
        console.error('Error finding the user:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.post('/', async (req, res) => {
    try{
        const owner = await Owner.create({firstname : req.owner.firstname, lastname : req.owner.firstname, picture : req.owner.picture})
        console.log("Auto-generated ID:", owner.id);
    }catch(error){
        console.error('Error finding the user:', error)
        res.status(500).json({ error: 'Internal server error' })        
    }
})

module.exports = router