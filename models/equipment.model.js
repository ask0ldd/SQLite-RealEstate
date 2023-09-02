const { Sequelize, DataTypes } = require("sequelize")
const sequelize = require('../config/database')

const Equipment = sequelize.define(
    "Equipment", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING
        },
        idRental: {
            type: DataTypes.INTEGER
        }
    },
)

Equipment.sync({ alter: true })

module.exports = Equipment