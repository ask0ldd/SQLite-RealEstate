const Host = require('../models/host.model.js')
const {Rental, Picture, Tag, Equipment} = require('../models/rental.model.js')
const sequelize = require('../config/database')

module.exports = async function initRental(){

    const rentals =[
        {
            title : "Appartement cosy",
            cover : "loc1.jpg",
            description : "Votre maison loin de chez vous. Que vous veniez de l'autre bout du monde, ou juste de quelques stations de RER, vous vous sentirez chez vous dans notre appartement.",
            rating : 5,
            location : "Ile de France - Paris 17e",
            host : 2,
            tags : [{value : "batignolle"},{value : "montmartre"}],
            equipments : [{value : "équipements de base"}, {value : "micro-ondes"}, {value : "douche italienne"}, {value : "frigo"}, {value : "WIFI"}],
            pictures : ["loc1.jpg", "loc9.jpg", "loc14.jpg", "loc16.jpg", ],
        },
        {
            title : "Magnifique appartement proche Canal Saint Martin",
            cover : "loc2.jpg",
            description : "Profitez du charme de la vie parisienne dans un magnifique appartement. A 3 minutes à pied du Canal Saint Martin, vous serez proche des transports, mais également de nombreux commerces. L'appartement est tout équipé, et possède également un parking pour ceux qui souhaitent se déplacer en voiture.",
            rating : 4,
            location : "Ile de France - Paris 10e",
            host : 1,
            tags : [{value : "canal Saint Martin"}, {value : "République"}, {value : "appartement"}],
            equipments : [{value : "parking"}, {value : "sèche cheveux"}, {value : "machine à laver"}, {value : "cuisine équipée"}, {value : "WIFI"}, {value : "télévision"}],
            pictures : ["loc2.jpg", "loc9.jpg", "loc14.jpg", "loc16.jpg", ],
        },
        {
            title: "Studio de charme - Buttes Chaumont",
            cover: "loc3.jpg",
            description: "À seulement deux pas des Buttes Chaumont, venez découvrir Paris dans ce studio tout équipé. Entièrement équipé pour votre confort et élégamment décoré, il vous permettra de vivre comme un Parisien le temps de votre séjour.",
            rating: 3,
            location: "Ile de France - Paris 20e",
            host : 3,
            tags : [{value : "Buttes Chaumont"}, {value : "Laumière"}, {value : "studio"}],
            equipments : [{value : "sèche cheveux"}, {value : "machine à laver"}, {value : "cuisine équipée"}, {value : "WIFI"}, {value : "télévision"}],
            pictures : ["loc3.jpg", "loc9.jpg", "loc14.jpg", "loc16.jpg", ],
        },
    ]

    rentals.forEach(async(rental) => {
        const rentalInstance = await Rental.create({
            "title": rental.title,
            "cover": rental.cover,
            "description": rental.description,
            "rating": rental.rating,
            "location": rental.location,
        })

        await rentalInstance.setHost(rental.host)

        const pictures = await Picture.findAll({where:{url : rental.pictures}})
        pictures.forEach(async(picture) => await rentalInstance.addPicture(picture))

        const tags = rental.tags
        tags.forEach(async (tagEl) => {
            const existingTag = await Tag.findOne({ where : tagEl })
            if(existingTag) {
                rentalInstance.addTag(existingTag)
            } else {
                const createdTag = await Tag.create(tagEl)
                rentalInstance.addTag(createdTag)
            }
        })

        const equipments = rental.equipments
        // console.log(equipments)
        equipments.forEach(async (equipmentEl) => {
            console.log(await Equipment.findAll())
            const existingEquipment = await Equipment.findOne({ where : equipmentEl })
            // console.log(existingEquipment)
            if(existingEquipment != null) {
                // rentalInstance.addEquipment(existingEquipment)
                
                // Start a transaction
                const t = await sequelize.transaction()
                await rentalInstance.setEquipment(existingEquipment, { transaction: t })
                await t.commit()
                // console.log("test")
                // await existingEquipment.setRental(rentalInstance)
            } else {
                const t = await sequelize.transaction()
                const createdEquipment = await Equipment.create(equipmentEl, { transaction: t })
                await rentalInstance.addEquipment(createdEquipment, { transaction: t })
                await t.commit()
            }
        })

    })
    
}