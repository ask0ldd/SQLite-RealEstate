const Host = require('../models/host.model.js')
const {Rental, Picture, Tag, Equipment, RentalsPictures} = require('../models/rental.model.js')
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
            tags : [{value : "Batignolle"},{value : "Montmartre"}],
            equipments : [{value : "Equipements de base"}, {value : "Micro-ondes"}, {value : "Douche italienne"}, {value : "Frigo"}, {value : "WIFI"}],
            pictures : ["loc1.jpg", "loc9.jpg", "loc14.jpg", "loc16.jpg", ],
        },
        {
            title : "Magnifique appartement proche Canal Saint Martin",
            cover : "loc2.jpg",
            description : "Profitez du charme de la vie parisienne dans un magnifique appartement. A 3 minutes à pied du Canal Saint Martin, vous serez proche des transports, mais également de nombreux commerces. L'appartement est tout équipé, et possède également un parking pour ceux qui souhaitent se déplacer en voiture.",
            rating : 4,
            location : "Ile de France - Paris 10e",
            host : 1,
            tags : [{value : "Canal Saint Martin"}, {value : "République"}, {value : "Appartement"}],
            equipments : [{value : "Parking"}, {value : "Sèche cheveux"}, {value : "Machine à laver"}, {value : "Cuisine équipée"}, {value : "WIFI"}, {value : "Télévision"}],
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
            equipments : [{value : "Sèche cheveux"}, {value : "Machine à laver"}, {value : "Cuisine équipée"}, {value : "WIFI"}, {value : "Télévision"}],
            pictures : ["loc3.jpg", "loc9.jpg", "loc14.jpg", "loc16.jpg", ],
        },
/**/
        {
            title : "Nid douillet au coeur du 11ème",
            cover : "loc4.jpg",
            description : "Venez découvrir Paris en séjournant dans ce nid douillet au coeur du 11ème. La vue sur le parc résidentiel saura vous reposer de vos longues journées de tourisme dans la capitale française. Et pour les plus fêtards d'entre vous, la rue Jean Pierre Timbaud vous permettra de découvrir la night-life parisienne à seulement 5 minutes de l'appartement.",
            rating : 3,
            location : "Ile de France - Paris 11e",
            host : 1,
            tags : [{value : "Parmentier"},{value : "Marais"},{value : "Parc"},{value : "Night Life"}],
            equipments : [{value : "Chambre Séparée"}, {value : "Micro-ondes"}, {value : "Climatisation"}, {value : "Télévision"}, {value : "WIFI"}],
            pictures : ["loc4.jpg", "loc9.jpg", "loc14.jpg", "loc16.jpg", ],
        },
        {
            title : "Appartement de Standing - 10e",
            cover : "loc5.jpg",
            description : "Ce loft entièrement rénové, et équipé de meubles de luxe saura vous séduire. Idéalement situé dans le 10ème arrondissement, vous déplacer dans Paris sera un véritable jeu d'enfant.",
            rating : 5,
            location : "Ile de France - Paris 10e",
            host : 3,
            tags : [{value : "Goncourt"}, {value : "Proche commerces"},],
            equipments : [{value : "Frigo Américain"}, {value : "Sèche cheveux"}, {value : "Chambre Séparée"}, {value : "Parking"}, {value : "WIFI"}],
            pictures : ["loc5.jpg", "loc9.jpg", "loc14.jpg", "loc16.jpg", ],
        },/*
        {
            title: "Studio de charme - Buttes Chaumont",
            cover: "loc3.jpg",
            description: "À seulement deux pas des Buttes Chaumont, venez découvrir Paris dans ce studio tout équipé. Entièrement équipé pour votre confort et élégamment décoré, il vous permettra de vivre comme un Parisien le temps de votre séjour.",
            rating: 3,
            location: "Ile de France - Paris 20e",
            host : 3,
            tags : [{value : "Buttes Chaumont"}, {value : "Laumière"}, {value : "studio"}],
            equipments : [{value : "Sèche cheveux"}, {value : "Machine à laver"}, {value : "Cuisine équipée"}, {value : "WIFI"}, {value : "Télévision"}],
            pictures : ["loc3.jpg", "loc9.jpg", "loc14.jpg", "loc16.jpg", ],
        },*/
    ]

    // !!! forEach doesnt work with async/await
    for(let rindex=0; rindex<rentals.length; rindex++){
        const rentalInstance = await Rental.create({
            "title": rentals[rindex].title,
            "cover": rentals[rindex].cover,
            "description": rentals[rindex].description,
            "rating": rentals[rindex].rating,
            "location": rentals[rindex].location,
        })

        await rentalInstance.setHost(rentals[rindex].host)

        const pictures = await Picture.findAll({where:{url : rentals[rindex].pictures}})
        // !!! forEach doesnt work with async/await
        for(let i=0; i<pictures.length; i++){
            await rentalInstance.addPicture(pictures[i])
        }

        const tags = rentals[rindex].tags
        for(let i=0; i<tags.length; i++){
            const existingTag = await Tag.findOne({ where : tags[i] })
            if(existingTag) {
                await existingTag.addRental(rentalInstance)
            } else {
                const createdTag = await Tag.create(tags[i])
                await rentalInstance.addTag(createdTag)
            }
        }

        const equipments = rentals[rindex].equipments
        for(let i=0; i<equipments.length; i++){
            const existingEquipment = await Equipment.findOne({ where : equipments[i]})
            if(existingEquipment != null) {
                // await rentalInstance.addEquipment(existingEquipment)
                await existingEquipment.addRental(rentalInstance)
            } else {
                const createdEquipment = await Equipment.create(equipments[i])
                await rentalInstance.addEquipment(createdEquipment) 
            }
        }

    }
    
}