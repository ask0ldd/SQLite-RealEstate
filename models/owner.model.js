const { Sequelize, DataTypes } = require("sequelize")
const sequelize = require('../config/database')


const Owner = sequelize.define(
    "owner", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        picture: {
            type: DataTypes.STRING,
        },
        firstname: {
            type: DataTypes.STRING,
        },
        lastname: {
            type: DataTypes.STRING,
        },
    },
)

module.exports = Owner