const Host = require('../models/host.model.js')
const Rental = require('../models/rental.model.js')
async function init (){
    const rental = await Rental.create({
        "title": "Appartement cosy",
        "cover": "loc1.jpg",
        "pictures": [
            "loc1.jpg",
            "loc9.jpg",
            "loc14.jpg",
            "loc16.jpg"
        ],
        "description": "Votre maison loin de chez vous. Que vous veniez de l'autre bout du monde, ou juste de quelques stations de RER, vous vous sentirez chez vous dans notre appartement.",
        "HostId": 1,
        "rating": 5,
        "location": "Ile de France - Paris 17e",
    })

    /*const host = await Host.findAll({where :{ id : '1' }})
    console.log(host)*/
    const set = await rental.setHost(1)
}

init()