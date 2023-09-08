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
        /*host: {
            type: DataTypes.INTEGER,
        },*/
        cover: {
            type: DataTypes.STRING,
            allowNull: false
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

// Bug : Equipment has no plural so Sequelize can't name the table correclty
const Equipement = sequelize.define(
    "Equipement", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        value: {
            type: DataTypes.STRING
        },
    },/*
    {
        tableName: 'Equipments'
    }*/
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

// create a table associating different rentals with different pictures
const RentalsPictures = sequelize.define('RentalsPictures', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    RentalId: {
      type: DataTypes.INTEGER,
      references: {
        model: Rental,
        key: 'id'
      }
    },
    PictureId: {
      type: DataTypes.INTEGER,
      references: {
        model: Picture,
        key: 'id'
      }
    }
})

const RentalsEquipements = sequelize.define('RentalsEquipements', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    RentalId: {
      type: DataTypes.INTEGER,
      references: {
        model: Rental,
        key: 'id'
      }
    },
    EquipementId: {
      type: DataTypes.INTEGER,
      references: {
        model: Equipement/*.tableName*/,
        key: 'id'
      }
    }
})

const RentalsTags = sequelize.define('RentalsTags', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    RentalId: {
      type: DataTypes.INTEGER,
      references: {
        model: Rental,
        key: 'id'
      }
    },
    TagId: {
      type: DataTypes.INTEGER,
      references: {
        model: Tag,
        key: 'id'
      }
    }
})

// Rental.hasMany(Tag)
// Rental.hasMany(Equipment)
Rental.belongsToMany(Tag, { through: RentalsTags })
Tag.belongsToMany(Rental, { through: RentalsTags })
Rental.belongsToMany(Equipement, { through: RentalsEquipements })
Equipement.belongsToMany(Rental, { through: RentalsEquipements })
Rental.belongsToMany(Picture, { through: RentalsPictures })
Picture.belongsToMany(Rental, { through: RentalsPictures })
/*Rental.hasMany(Picture)
Picture.belongsTo(Rental)*/
Host.hasMany(Rental)
Rental.belongsTo(Host)

module.exports = {Picture, Tag, Equipement, Rental, RentalsPictures}
