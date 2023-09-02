const { Sequelize, DataTypes } = require("sequelize")
const sequelize = require('../config/database')


const Rental = sequelize.define(
    "rental", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 10]
            }
        },
        rating: {
            type: DataTypes.NUMBER,
            allowNull: false,
            validate: {
                min: 0,
                max: 5,
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        equipments: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        pictures: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
    },
)

module.exports = Rental