const Host = require('../models/host.model.js')
const {Picture} = require('../models/rental.model.js')
module.exports = async function initPictures(){
    const pictures = await Picture.bulkCreate(
        [...Array(16).keys()].map((el, index) => {return ({url : `loc${index+1}.jpg`})})
    )
}