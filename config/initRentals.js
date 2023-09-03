const Rental = require('../models/rental.model.js')

Rental.create({
    "title": "Appartement cosy",
    "cover": "loc1.jpg",
    "pictures": [
        "loc1.jpg",
        "loc9.jpg",
        "loc14.jpg",
        "loc16.jpg"
    ],
    "description": "Votre maison loin de chez vous. Que vous veniez de l'autre bout du monde, ou juste de quelques stations de RER, vous vous sentirez chez vous dans notre appartement.",
    "host": 1,
    "rating": 5,
    "location": "Ile de France - Paris 17e",
})