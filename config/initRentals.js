const Host = require('../models/host.model.js')
const {Rental, Picture, Tag, Equipement, RentalsPictures} = require('../models/rental.model.js')
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
            tags : ["Batignolle", "Montmartre"],
            equipments : ["Equipements de base", "Micro-ondes", "Douche italienne", "Frigo", "WIFI"],
            pictures : ["loc1.jpg", "loc9.jpg", "loc14.jpg", "loc16.jpg", ],
        },
        {
            title : "Magnifique appartement proche Canal Saint Martin",
            cover : "loc2.jpg",
            description : "Profitez du charme de la vie parisienne dans un magnifique appartement. A 3 minutes à pied du Canal Saint Martin, vous serez proche des transports, mais également de nombreux commerces. L'appartement est tout équipé, et possède également un parking pour ceux qui souhaitent se déplacer en voiture.",
            rating : 4,
            location : "Ile de France - Paris 10e",
            host : 1,
            tags : ["Canal Saint Martin", "République", "Appartement"],
            equipments : ["Parking", "Sèche cheveux", "Machine à laver", "Cuisine équipée", "WIFI", "Télévision"],
            pictures : ["loc2.jpg", "loc9.jpg", "loc14.jpg", "loc16.jpg", ],
        },
        {
            title: "Studio de charme - Buttes Chaumont",
            cover: "loc3.jpg",
            description: "À seulement deux pas des Buttes Chaumont, venez découvrir Paris dans ce studio tout équipé. Entièrement équipé pour votre confort et élégamment décoré, il vous permettra de vivre comme un Parisien le temps de votre séjour.",
            rating: 3,
            location: "Ile de France - Paris 20e",
            host : 3,
            tags : ["Buttes Chaumont", "Laumière", "Studio"],
            equipments : ["Sèche cheveux", "Machine à laver", "Cuisine équipée", "WIFI", "Télévision"],
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
            tags : ["Parmentier", "Marais", "Parc", "Night Life"],
            equipments : ["Chambre Séparée", "Micro-ondes", "Climatisation", "Télévision", "WIFI"],
            pictures : ["loc4.jpg", "loc9.jpg", "loc14.jpg", "loc16.jpg", ],
        },
        {
            title : "Appartement de Standing - 10e",
            cover : "loc5.jpg",
            description : "Ce loft entièrement rénové, et équipé de meubles de luxe saura vous séduire. Idéalement situé dans le 10ème arrondissement, vous déplacer dans Paris sera un véritable jeu d'enfant.",
            rating : 5,
            location : "Ile de France - Paris 10e",
            host : 3,
            tags : ["Goncourt", "Proche commerces",],
            equipments : ["Frigo Américain", "Sèche cheveux", "Chambre Séparée", "Parking", "WIFI"],
            pictures : ["loc5.jpg", "loc9.jpg", "loc14.jpg", "loc16.jpg", ],
        },
        {
            title: "Studio d'artiste",
            cover: "loc6.jpg",
            description: "Venez vous imprégner de la culture parisienne dans cet ancien studio d'artiste décoré avec goût, au coeur de Montmartre.",
            rating: 5,
            location: "Ile de France - Paris 18e",
            host : 4,
            tags : ["Montmartre", "Culture", "Charme"],
            equipments : ["Chambre Séparée", "Parking",],
            pictures : ["loc6.jpg", "loc9.jpg", "loc14.jpg", "loc16.jpg", ],
        },
        {
            title: "Cheap - Studio 18ème",
            cover: "loc7.jpg",
            description: "Ce Studio entièrement fonctionnel sera votre parfait pied à terre pour toutes vos excursions parisiennes. Idéalement situé près des lignes 2 et 4, vous accéderez très rapidement à tous les points touristiques de Paris.",
            rating: 3,
            location: "Ile de France - Paris 18e",
            host : 5,
            tags : [
                "Transports",
                "Cheap",
                "18ème"
            ],
            equipments : [
                "Salle de bains",
                "Frigo",
                "Wi-fi",
                "Sèche Cheveux",
                "Bureau",
                "Parking"
            ],
            pictures : ["loc7.jpg", "loc9.jpg", "loc14.jpg", "loc16.jpg", ],
        },
        {
            title: "Superbe appartement proche Tour Eiffel",
            cover: "loc8.jpg",
            pictures : ["loc8.jpg", "loc9.jpg", "loc14.jpg", "loc16.jpg", ],
            description: "Ce superbe appartement vous surprendra par son charme. Entièrement refait à neuf, il est équipé avec goût. La taille des pièces vous fera douter que vous êtes à Paris. Mais il vous suffit de sortir pour voir que vous êtes au coeur des plus belles attractions de Paris : le Louvre, la Tour Eiffel, le Grand Palais sont à deux pas. À vous de venir découvrir Paris !",
            host : 6,
            rating: 5,
            location: "Ile de France - Paris 6e",
            equipments: [
              "Wi-fi",
              "Sèche Cheveux",
              "Machine à laver",
              "Parking",
              "Lit King Size",
              "Ascenseur"
            ],
            tags: ["Luxe", "Tour Eiffel", "T3", "6ème"]
        },
        {
            title: "Suite familiale",
            cover: "loc9.jpg",
            pictures: [
                "../assets/locs/loc9.jpg",
                "../assets/locs/loc14.jpg",
                "../assets/locs/loc16.jpg"
            ],
            description: "Paris vous tend les bras ! En famille ou entre amis, venez découvrir la ville de l'amour dans un appartement de goût. Vous pourrez profiter de tous les commerces seulement à quelques minutes de l'appartement. Sa proximité avec la gare Montparnasse en fait également un choix idéal pour celles et ceux qui doivent prendre un train.",
            host: 7,
            rating: 4,
            location: "Ile de France - Paris 14e",
            equipments: [
                "Climatisation",
                "Machine à laver",
                "Sèche Cheveux",
                "Wi-fi",
                "Parking"
            ],
            tags: [
                "Montparnasse",
                "Commerces",
                "Famille"
            ]
        },
        {
            title: "Appartement moderne sur parc",
            cover: "loc10.jpg",
            pictures: [
                "loc10.jpg",
                "loc9.jpg",
                "loc14.jpg",
                "loc16.jpg"
            ],
            description: "Respirer en plein coeur de Paris ? C'est possible ! Avec vue sur un parc résidentiel, vous pourrez ouvrir les fenêtres sans avoir à souffrir du bruit des voitures et de la pollution. Au contraire, vous pourrez écouter les oiseaux. Notre appartement est également idéalement situé au coeur du 11ème arrondissement. Proche des lignes 3 et 2, vous pourrez découvrir Paris sans effort !",
            host: 7,
            rating: 3,
            location: "Ile de France - Paris 11e",
            equipments: [
                "Vue Parc",
                "Chauffage",
                "Sèche linge",
                "Sèche Cheveux",
                "Wi-fi",
                "Ascenseur"
            ],
            tags: [
                "Père Lachaise",
                "11e",
                "Metro 3",
                "Metro 2"
            ]
        },
        {
            title: "Charmant Studio Marais",
            cover: "loc11.jpg",
            pictures: [
                "loc11.jpg",
                "loc9.jpg",
                "loc14.jpg",
                "loc16.jpg"
            ],
            description: "Situé en plein coeur du Marais, notre studio est idéal pour les touristes en quête de découverte. Sa cuisine toute équipée est particulièrement pratique.",
            host: 8,
            rating: 4,
            location: "Ile de France - Paris 11e",
            equipments: [
                "Clic-clac",
                "Four",
                "Sèche Cheveux",
                "Wi-fi"
            ],
            tags: [
                "Marais",
                "Studio",
                "Parc"
            ]
        },
        {
            title: "Studio fonctionnel République",
            cover: "loc12.jpg",
            pictures: [
                "loc12.jpg",
                "loc9.jpg",
                "loc14.jpg",
                "loc16.jpg"
            ],
            description: "Idéalement situé à 2 pas de la place de la République, ce studio particulièrement fonctionnel est parfait pour découvrir Paris. Proche de tous les points d'intérêts grâce aux 5 lignes de métro qui sont à 5 minutes, vous pourrez rentabiliser votre temps passé à la capitale.",
            host: 9,
            rating: 3,
            location: "Ile de France - Paris 3e",
            equipments: [
                "Rangements",
                "Lit",
                "Sèche Cheveux",
                "Wi-fi",
                "TV",
                "Bouilloire"
            ],
            tags: [
                "Marais",
                "République",
                "Studio",
                "Proche Métros",
                "Commerces"
            ]
        },
        {
            title: "Bungalow dans la forêt",
            cover: "loc13.jpg",
            pictures: [
                "loc13.jpg",
                "loc9.jpg",
                "loc14.jpg",
                "loc16.jpg"
            ],
            description: "Quittez Paris pour vous mettre au vert. À seulement 30 minutes de la Gare du Nord, venez découvrir la forêt d'Ecouen directement depuis la fenêtre de votre bungalow. Entièrement équipé, ce logement saura vous accueillir dans le confort, tout en vous permettant de vous concentrer sur l'essentiel. Le matin, ouvrez les fenêtres, et profitez du chant des oiseaux.",
            host: 9,
            rating: 5,
            location: "Ile de France - Ecouen",
            equipments: [
                "SDB",
                "Cuisine équipée",
                "Toilettes sèches",
                "Frigo",
                "Bouilloire"
            ],
            tags: [
                "Forêt",
                "Nature",
                "Musée d'Ecouen"
            ]
        },
        {
            title: "Grande Maison proche banlieue",
            cover: "loc14.jpg",
            pictures: [
                "loc14.jpg",
                "loc9.jpg",
                "loc16.jpg"
            ],
            description: "Vous chercher un endroit pour fêter un anniversaire entre amis tout en restant proche de Paris ? Ne cherchez plus ! Entièrement équipée, cette maison est l'endroit idéal pour se regrouper.",
            host: 10,
            rating: 4,
            location: "Ile de France - Arnouville",
            equipments: [
                "SDB",
                "Cuisine équipée",
                "Frigo",
                "Bouilloire",
                "WIFI",
                "Télévision",
                "Cintres",
                "Équipements de base"
            ],
            tags: [
                "Forêt",
                "Nature",
                "Grande maison"
            ]
        },
        {
            title: "Maison T5 - Le Vésinet",
            cover: "loc15.jpg",
            pictures: [
                "loc15.jpg",
                "loc9.jpg",
                "loc14.jpg",
                "loc16.jpg"
            ],
            description: "Maison T5. Idéale pour grands groupes. 45 minutes de Paris Saint-Lazare.",
            host: 10,
            rating: 3,
            location: "Ile de France - Arnouville",
            equipments: [
                "Bouilloire",
                "SDB",
                "Cuisine équipée",
                "Frigo",
                "WIFI",
                "TV",
                "Cintres",
                "Four",
                "Micro-Ondes",
                "Parking"
            ],
            tags: [
                "Nature",
                "Groupe",
                "Maison"
            ]
        },
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
            const existingTag = await Tag.findOne({ where :{value : tags[i]} })
            if(existingTag) {
                await existingTag.addRental(rentalInstance)
            } else {
                const createdTag = await Tag.create({value : tags[i]})
                await rentalInstance.addTag(createdTag)
            }
        }

        const equipments = rentals[rindex].equipments
        for(let i=0; i<equipments.length; i++){
            const existingEquipment = await Equipement.findOne({ where : {value : equipments[i]} })
            if(existingEquipment != null) {
                // await rentalInstance.addEquipment(existingEquipment)
                await existingEquipment.addRental(rentalInstance)
            } else {
                const createdEquipment = await Equipement.create({value : equipments[i]})
                await rentalInstance.addEquipement(createdEquipment) 
            }
        }

    }
    
}