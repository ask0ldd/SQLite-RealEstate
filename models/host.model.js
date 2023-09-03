const { Sequelize, DataTypes } = require("sequelize")
const sequelize = require('../config/database')

const Host = sequelize.define(
    "Host", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        picture: {
            type: DataTypes.STRING
        },
        firstname: {
            type: DataTypes.STRING
        },
        lastname: {
            type: DataTypes.STRING
        },
    },
)

Host.sync()

module.exports = Host