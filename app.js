const express = require('express')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')

// db
const sequelize = require('./config/database')
// const User = require('./models/user.model.js')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
/*app.use(helmet())
app.use('/images', express.static(path.join(__dirname, 'images')))*/

const users = require('./routes/users')
const rentals = require('./routes/rentals')
const hosts = require('./routes/hosts')
const initHosts = require('./config/initHosts')
const initRentals = require('./config/initRentals')
const initPictures = require('./config/initPictures')

// db sync
sequelize.sync({ force: true }) // temp : reinit the tables each time the app is launched
.then(() => {
    console.log('Database synced')
    // temp : populate some tables
    initHosts()
    initPictures()
    initRentals()

}).catch((error) => {
    console.error('Error syncing database:', error)
})

app.use('/users', users)
app.use('/rentals', rentals)
app.use('/hosts', hosts)
  
module.exports = app


/*const db = require("./models");
const userRoutes = require('./routes/user.routes');
const categoriesRoutes = require('./routes/categories.routes');
const worksRoutes = require('./routes/works.routes');
db.sequelize.sync().then(()=> console.log('db is ready'));
app.use('/api/users', userRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/works', worksRoutes);*/