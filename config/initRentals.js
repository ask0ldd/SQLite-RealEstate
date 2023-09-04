const Host = require('../models/host.model.js')
const {Rental, Picture, Tag, Equipment} = require('../models/rental.model.js')
module.exports = async function initRental(){
    let rental = await Rental.create({
        "title": "Appartement cosy",
        "cover": "loc1.jpg",
        "description": "Votre maison loin de chez vous. Que vous veniez de l'autre bout du monde, ou juste de quelques stations de RER, vous vous sentirez chez vous dans notre appartement.",
        "rating": 5,
        "location": "Ile de France - Paris 17e",
    })

    let set = await rental.setHost(2)
    let pictures = await Picture.findAll({where:{url : ["loc1.jpg", "loc9.jpg", "loc14.jpg", "loc16.jpg", ]}})
    pictures.forEach(async(picture) => await rental.addPicture(picture))

    rental = await Rental.create({
        "title": "Magnifique appartement proche Canal Saint Martin",
        "cover": "loc2.jpg",
        "description": "Profitez du charme de la vie parisienne dans un magnifique appartement. A 3 minutes à pied du Canal Saint Martin, vous serez proche des transports, mais également de nombreux commerces. L'appartement est tout équipé, et possède également un parking pour ceux qui souhaitent se déplacer en voiture.",
        "rating": 4,
        "location": "Ile de France - Paris 10e",
    })

    const Tags = [{value : "batignolle"},{value : "montmartre"}]
    Tags.forEach(async (tag) => {
        let tagInstance = await Tag.create(tag)
        rental.addTag(tagInstance)
    })

    const Equipments = [{value : "équipements de base"}, {value : "micro-ondes"}, {value : "douche italienne"}, {value : "frigo"}, {value : "WIFI"}]
    Equipments.forEach(async (tag) => {
        let equipmentInstance = await Equipment.create(tag)
        rental.addEquipment(equipmentInstance)
    })

    set = await rental.setHost(1)
    pictures = await Picture.findAll({where:{url : ["loc2.jpg", "loc9.jpg", "loc14.jpg", "loc16.jpg", ]}})
    pictures.forEach(async(picture) => await rental.addPicture(picture))

    rental = await Rental.create({
        "title": "Studio de charme - Buttes Chaumont",
        "cover": "loc3.jpg",
        "description": "À seulement deux pas des Buttes Chaumont, venez découvrir Paris dans ce studio tout équipé. Entièrement équipé pour votre confort et élégamment décoré, il vous permettra de vivre comme un Parisien le temps de votre séjour.",
        "rating": 3,
        "location": "Ile de France - Paris 20e",
    })

    set = await rental.setHost(3)
    pictures = await Picture.findAll({where:{url : ["loc3.jpg", "loc9.jpg", "loc14.jpg", "loc16.jpg", ]}})
    pictures.forEach(async(picture) => await rental.addPicture(picture))
    
}