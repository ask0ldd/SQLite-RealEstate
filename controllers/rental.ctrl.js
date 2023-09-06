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
        const rental = req.body
        await  Rental.update({ 
            title: rental.title,
            description: rental.description,
            rating : rental.rating,
            HostId : rental.host.id,
            location : rental.location,
        }, {
            where: {
                id : rental.id
            }
        })
        const dbRental = await Rental.findOne({where:{id : parseInt(req.params.id)}, include: [{ model: Picture}, { model: Host}, { model: Tag}, { model: Equipment}]})      
        const bodyTags = req.body.tags
        const dbToRemoveTags = await dbRental.getTags()
        await dbRental.removeTags(dbToRemoveTags)
        // .findCreateFind : get the existing tags and to create and the missing ones
        // .addTag : link those tags to the target rental
        for(let i = 0; i < bodyTags.length; i++)
        {
            const createdOrExistingTag = await Tag.findCreateFind({where: { value: bodyTags[i] },
                defaults: { value: bodyTags[i] }
            })
            if(createdOrExistingTag.length > 0) await dbRental.addTag(createdOrExistingTag[0])
        }
        return res.status(200).json({message : "200 : Rental update successful."})
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