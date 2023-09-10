const User = require("../models/user.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try{
        const user = await Rental.findOne({where:{email : req.body.email}})
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordValid) { return res.status(401).json({ message : 'Password & login dont match.' })}
        res.status(200).json({
            userId: user.id,
            // send back a jsonwebtoken
            token: jwt.sign({ userId: user.id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '1h' })
        })

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