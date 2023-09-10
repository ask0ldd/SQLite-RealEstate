const User = require("../models/user.model")

exports.log = async (req, res) => {
    try{

    } catch (error){
        console.error("Can't log:", error)
        res.status(500).json({ error: 'Internal server error' })
    }
}