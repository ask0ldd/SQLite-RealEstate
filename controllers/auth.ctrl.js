const User = require("../models/user.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

exports.log = async (req, res) => {
    try{

    } catch (error){
        console.error("Can't log:", error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

exports.signup = async (req, res) => {
    try{
        const { firstname, lastname, email, password, city, country } = req.body
        // verify password length
        const hash = await bcrypt.hash(req.body.password, 10)
        const user = await User.create({ firstname, lastname, email, password : hash, city, country })
        res.status(201).json(user)
    } catch (error){
        console.error("Can't log:", error)
        res.status(500).json({ error: 'Internal server error' })
    }
}