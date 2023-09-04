const express = require('express')
const {Rental, Picture, Tag, Equipment} = require('../models/rental.model.js')
const Host = require('../models/host.model.js')
const router = express.Router()

router.get('/', async (req, res) => {
    try{
        const rentals = await Rental.findAll()
        // console.log(await rentals[0].getPictures()[0])
        return res.status(200).json(rentals)
    } catch (error){
        console.error('Error finding the user:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.get('/:id', async (req, res) => {
    try{
        const rental = await Rental.findOne({where:{id : parseInt(req.params.id)}, include: [{ model: Picture}, { model: Host}, { model: Tag}, { model: Equipment}]})
        const {firstname, lastname, picture} = await rental.getHost()

        /*return res.status(200).json({
            ...rental, 
            host : {firstname : firstname, lastname : lastname, picture : picture}, 
            tags : (await rental.getTags()).map(rental => { return({value : rental.value}) }),
            pictures : (await rental.getPictures()).map(rental => { return(rental.url) }),
        })*/
        
        return res.status(200).json({
            id : rental.id,
            title : rental.title,
            cover : rental.cover,
            pictures : await rental.Pictures.map(picture => {return picture.url}),
            description : rental.description,
            host : {picture : rental.Host.picture, firstname : rental.Host.firstname, lastname : rental.Host.lastname},
            rating : rental.rating,
            location : rental.location,
            equipments : await rental.Equipment.map(equipment => {return equipment.value}),
            tags : await rental.Tags.map(tag => {return tag.value}),
        })
        
    } catch (error){
        console.error('Error finding the user:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

module.exports = router