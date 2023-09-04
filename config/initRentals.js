const Host = require('../models/host.model.js')
const {Rental, Picture, Tag, Equipment} = require('../models/rental.model.js')
module.exports = async function initRental(){

    /* rental 1 */

    const rental = await Rental.create({
        "title": "Appartement cosy",
        "cover": "loc1.jpg",
        "description": "Votre maison loin de chez vous. Que vous veniez de l'autre bout du monde, ou juste de quelques stations de RER, vous vous sentirez chez vous dans notre appartement.",
        "rating": 5,
        "location": "Ile de France - Paris 17e",
    })

    let set = await rental.setHost(2)
    const pictures = await Picture.findAll({where:{url : ["loc1.jpg", "loc9.jpg", "loc14.jpg", "loc16.jpg", ]}})
    pictures.forEach(async(picture) => await rental.addPicture(picture))

    const tags = [{value : "batignolle"},{value : "montmartre"}]
    tags.forEach(async (tagEl) => {
        const existingTag = await Tag.findOne({ where : tagEl })
        if(existingTag) {
            rental.addTag(existingTag)
        } else {
            const createdTag = await Tag.create(tagEl)
            rental.addTag(createdTag)
        }
    })

    const equipments = [{value : "équipements de base"}, {value : "micro-ondes"}, {value : "douche italienne"}, {value : "frigo"}, {value : "WIFI"}]
    equipments.forEach(async (equipmentEl) => {
        const existingEquipment = await Equipment.findOne({ where : equipmentEl })
        if(existingEquipment) {
            rental.addEquipment(existingEquipment)
        } else {
            const createdEquipment = await Equipment.create(equipmentEl)
            rental.addEquipment(createdEquipment)
        }
    })

    /* rental 2 */

    const rental2 = await Rental.create({
        "title": "Magnifique appartement proche Canal Saint Martin",
        "cover": "loc2.jpg",
        "description": "Profitez du charme de la vie parisienne dans un magnifique appartement. A 3 minutes à pied du Canal Saint Martin, vous serez proche des transports, mais également de nombreux commerces. L'appartement est tout équipé, et possède également un parking pour ceux qui souhaitent se déplacer en voiture.",
        "rating": 4,
        "location": "Ile de France - Paris 10e",
    })

    set = await rental.setHost(1)
    const pictures2 = await Picture.findAll({where:{url : ["loc2.jpg", "loc9.jpg", "loc14.jpg", "loc16.jpg", ]}})
    pictures2.forEach(async(picture) => await rental2.addPicture(picture))

    const tags2 = [{value : "canal Saint Martin"}, {value : "République"}, {value : "appartement"}]
    tags2.forEach(async (tagEl) => {
        const existingTag = await Tag.findOne({ where : tagEl })
        if(existingTag) {
            rental2.addTag(existingTag)
        } else {
            const createdTag = await Tag.create(tagEl)
            rental2.addTag(createdTag)
        }
    })

    const equipments2 = [{value : "parking"}, {value : "sèche cheveux"}, {value : "machine à laver"}, {value : "cuisine équipée"}, {value : "WIFI"}, {value : "télévision"}]
    equipments2.forEach(async (equipmentEl) => {
        const existingEquipment = await Equipment.findOne({ where : equipmentEl })
        if(existingEquipment) {
            rental2.addEquipment(existingEquipment)
        } else {
            const createdEquipment = await Equipment.create(equipmentEl)
            rental2.addEquipment(createdEquipment)
        }
    })

    /* rental 3 */

    const rental3 = await Rental.create({
        "title": "Studio de charme - Buttes Chaumont",
        "cover": "loc3.jpg",
        "description": "À seulement deux pas des Buttes Chaumont, venez découvrir Paris dans ce studio tout équipé. Entièrement équipé pour votre confort et élégamment décoré, il vous permettra de vivre comme un Parisien le temps de votre séjour.",
        "rating": 3,
        "location": "Ile de France - Paris 20e",
    })

    set = await rental.setHost(3)
    const pictures3 = await Picture.findAll({where:{url : ["loc3.jpg", "loc9.jpg", "loc14.jpg", "loc16.jpg", ]}})
    pictures3.forEach(async(picture) => await rental3.addPicture(picture))

    const tags3 = [{value : "Buttes Chaumont"}, {value : "Laumière"}, {value : "studio"}]
    tags3.forEach(async (tagEl) => {
        const existingTag = await Tag.findOne({ where : tagEl })
        if(existingTag) {
            rental3.addTag(existingTag)
        } else {
            const createdTag = await Tag.create(tagEl)
            rental3.addTag(createdTag)
        }
    })

    const equipments3 = [{value : "sèche cheveux"}, {value : "machine à laver"}, {value : "cuisine équipée"}, {value : "WIFI"}, {value : "télévision"}]
    equipments3.forEach(async (equipmentEl) => {
        const existingEquipment = await Equipment.findOne({ where : equipmentEl })
        if(existingEquipment) {
            rental3.addEquipment(existingEquipment)
        } else {
            const createdEquipment = await Equipment.create(equipmentEl)
            rental3.addEquipment(createdEquipment)
        }
    })
    
}