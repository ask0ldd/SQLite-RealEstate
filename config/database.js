const { Sequelize } = require('sequelize');

const dbConfig = {
    dialect: 'sqlite',
    host: 'localhost',
    storage: './database.sqlite',
    logging: false,
}

const sequelize = new Sequelize(
    'database', 'user', 'password', dbConfig
)

module.exports = sequelize