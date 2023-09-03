const { Sequelize, DataTypes } = require("sequelize")
const sequelize = require('../config/database')
const Host = require("./host.model")

const Rental = sequelize.define(
    "Rental", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        host: {
            type: DataTypes.INTEGER,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
            /*validate: {
                len: [5, 10]
            }*/
        },
        rating: {
            type: DataTypes.NUMBER,
            allowNull: false
            /*validate: {
                min: 0,
                max: 5
            }*/
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        /*equipments: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        pictures: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        }*/
    },
)

const Tag = sequelize.define(
    "Tag", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        value: {
            type: DataTypes.STRING
        },
    },
)

const Equipment = sequelize.define(
    "Equipment", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        value: {
            type: DataTypes.STRING
        },
    },
)

const Picture = sequelize.define(
    "Picture", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        url: {
            type: DataTypes.STRING
        },
    },
)

Rental.hasMany(Tag)
Rental.hasMany(Equipment)
Rental.hasMany(Picture)
Rental.hasOne(Host, {
    foreignKey: 'id',
    sourceKey: 'host',
  })
/*Host.belongsToMany(Rental, {
    foreignKey: 'host',
    sourceKey: 'id',
  })*/

Rental.sync()

module.exports = Rental