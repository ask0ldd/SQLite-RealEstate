const { Sequelize, DataTypes } = require("sequelize")
const sequelize = require('../config/database')

const Like = sequelize.define(
    "Like", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idRental: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },)

    module.exports = Like