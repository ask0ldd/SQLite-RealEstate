const {Rental, Picture, Tag, Equipement} = require('../models/rental.model.js')
const Host = require('../models/host.model.js')
const Like = require('../models/like.model.js')

exports.getAllRentals = async (req, res) => {
    try{
        const rentals = await Rental.findAll({include: [ Picture, Host, Tag, Equipement]})
        if(rentals.length === 0) return res.status(404).json({ error: new Error("Couldn't find any rental.") })
        return res.status(200).json(rentals.map(rental => rentalFormating(rental)))
    } catch (error){
        console.error('Error finding the user:', error)
        res.status(500).json({ error: new Error('Internal server error') })
    }
}

exports.getRentalById = async (req, res) => {
    try{
        const rental = await Rental.findOne({where:{id : parseInt(req.params.id)}, include: [{ model: Picture}, { model: Host}, { model: Tag}, { model: Equipement}]})
        // console.log(JSON.stringify(rental))
        if(rental == null) return res.status(404).json({ error: new Error("Couldn't find the rental.") })
        return res.status(200).json(rentalFormating(rental))        
    } catch (error){
        console.error('Error finding the user:', error)
        res.status(500).json({ error: new Error('Internal server error.') })
    }
}

exports.updateRentalById = async (req, res) => {
    try{
        const rental = req.body.rental
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

        // console.log('tokenid ', req.auth.userId)
        const dbRental = await Rental.findOne({where:{id : parseInt(req.params.id)}, include: [{ model: Picture}, { model: Host}, { model: Tag}, { model: Equipement}]})
        
        // update Tags
        const bodyTags = req.body.rental.tags
        const dbToRemoveTags = await dbRental.getTags()
        await dbRental.removeTags(dbToRemoveTags)
        // .findCreateFind : get the existing tags and to create and the missing ones
        // .addTag : link those tags to the target rental
        for(const tag of bodyTags)
        {
            const createdOrExistingTag = await Tag.findCreateFind({where: { value: tag },
                defaults: { value: tag }
            })
            if(createdOrExistingTag.length > 0) await dbRental.addTag(createdOrExistingTag[0])
        }

        // update Equipments
        const bodyEquipments = req.body.rental.equipments
        const dbToRemoveEquipements = await dbRental.getEquipements()
        await dbRental.removeEquipements(dbToRemoveEquipements)
        
        for(const equipment of bodyEquipments)
        {
            const createdOrExistingEquipement = await Equipement.findCreateFind({where: { value: equipment },
                defaults: { value: equipment }
            })
            if(createdOrExistingEquipement.length > 0) await dbRental.addEquipement(createdOrExistingEquipement[0])
        }

        // update Pictures
        const bodyPictures = req.body.rental.pictures
        const dbToRemovePictures = await dbRental.getPictures()
        await dbRental.removePictures(dbToRemovePictures)
        
        for(const picture of bodyPictures)
        {
            const createdOrExistingPicture = await Picture.findCreateFind({where: { url: picture },
                defaults: { url: picture }
            })
            if(createdOrExistingPicture.length > 0) await dbRental.addPicture(createdOrExistingPicture[0])
        }

        return res.status(200).json({message : "Rental update successful."})

    } catch (error){
        console.error('Error finding the user:', error)
        res.status(500).json({ error: new Error('Internal server error') }) // update error code
    }
}

exports.savePicture = async (req, res) => {
    try{
        res.body = req.body
        return res.status(200).json({message : "200 : Rental update successful.", filename : req.file.filename})
    } catch (error){
        console.error('Error finding the user:', error)
        res.status(500).json({ error: new Error('Internal server error') }) // update error code
    }
}

exports.switchLike = async(req, res) => {
    try{
        const {userId, rentalId} = req.body
        const existingLike = await Like.findOne({where : {idUser : userId, idRental : rentalId}})
        if(existingLike == null){
            const likeInstance = await Like.create({
                "idUser": userId,
                "idRental": rentalId,
            })
            return res.status(200).json({rentalLiked : true})
        }
        await Like.destroy({where : {idUser : userId, idRental : rentalId}})
        return res.status(200).json({rentalLiked : false})

    }catch(error){
        console.error('Error finding the user:', error)
        res.status(500).json({ error: new Error('Internal server error') }) // update error code
    }

}

exports.isLiked = async(req, res) => {
    try{
        const {userId, rentalId} = req.body
        const existingLike = await Like.findOne({where : {idUser : userId, idRental : rentalId}})
        return res.status(200).json({rentalLiked : existingLike != null ? true : false})
    }catch(error){
        console.error('Error finding the user:', error)
        res.status(500).json({ error: new Error('Internal server error') }) // update error code
    }
}

exports.getUserLikesList = async(req, res) => {
    try{
        const likesList = await Like.findAll({where : {idUser : +req.params.userId}})
        if(likesList.length === 0) return res.status(200).json([])
        return res.status(200).json(likesList.map(like => { return like.idRental }))
    }catch(error){
        console.error('Error finding the likes list related to this user :', error)
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
        equipments : rental.Equipements.map(Equipement => {return Equipement.value}),
        tags : rental.Tags.map(tag => {return tag.value}),
    })
}