const {Rental, Picture, Tag, Equipment} = require('../models/rental.model.js')
const Host = require('../models/host.model.js')

exports.getAllRentals = async (req, res) => {
    try{
        const rentals = await Rental.findAll({include: [ Picture, Host, Tag, Equipment]})
        return res.status(200).json(rentals.map(rental => rentalFormating(rental)))
    } catch (error){
        console.error('Error finding the user:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

exports.getRentalById = async (req, res) => {
    try{
        const rental = await Rental.findOne({where:{id : parseInt(req.params.id)}, include: [{ model: Picture}, { model: Host}, { model: Tag}, { model: Equipment}]})      
        return res.status(200).json(rentalFormating(rental))        
    } catch (error){
        console.error('Error finding the user:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

exports.updateRentalById = async (req, res) => {
    try{
        const rental = await Rental.findOne({where:{id : parseInt(req.params.id)}, include: [{ model: Picture}, { model: Host}, { model: Tag}, { model: Equipment}]})
        console.log(req.body)
        // await Rental.update() 
        // await Rental.save()
        // return res.status(200).json(rentalFormating(rental))        
    } catch (error){
        console.error('Error finding the user:', error)
        res.status(500).json({ error: 'Internal server error' }) // update error code
    }
}

function rentalFormating(rental){
    return ({
        id : rental.id,
        title : rental.title,
        cover : rental.cover,
        pictures : rental.Pictures.map(picture => {return picture.url}),
        description : rental.description,
        host : {id: rental.HostId, picture : rental.Host.picture, firstname : rental.Host.firstname, lastname : rental.Host.lastname},
        rating : rental.rating,
        location : rental.location,
        equipments : rental.Equipment.map(equipment => {return equipment.value}),
        tags : rental.Tags.map(tag => {return tag.value}),
    })
}