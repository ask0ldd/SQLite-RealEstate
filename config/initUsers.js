const User = require('../models/user.model.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const sequelize = require('../config/database')

module.exports = async function initUser(){
    const user = User.create({
        email: "john.doe@email.com",
        password: await bcrypt.hash('genericpassword', 10),
        firstname: "john",
        lastname: "doe",
        city: "paris",
        country: "france",
    })
}