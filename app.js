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

const rentals = require('./routes/rentals')
const hosts = require('./routes/hosts')
const uploads = require('./routes/uploads')
const auth = require('./routes/auth')
const like = require('./routes/likes')
const initHosts = require('./config/initHosts')
const initRentals = require('./config/initRentals')
const initPictures = require('./config/initPictures')
const initUsers = require('./config/initUsers')

// db sync
sequelize.sync({ force: true }) // temp : reinit the tables each time the app is launched
.then(() => {
    console.log('Database synced')
    // temp : populate some tables
    initHosts()
    initPictures()
    initRentals()
    initUsers()

}).catch((error) => {
    console.error('Error syncing database:', error)
})

app.use('/pics', express.static(path.join(__dirname, 'pics'))) // serving the pics folder

app.use(express.json({limit: '2mb'})) // extract json from request body // fixe limit

app.use((req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', '*') // deals with CORS
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, X-Auth-Token')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE') // out : PATCH, OPTIONS
    next()
})

app.use('/rentals', rentals)
app.use('/hosts', hosts)
app.use('/upload', uploads)
app.use('/auth', auth)
app.use('/', like)

module.exports = app


/*const db = require("./models");
const userRoutes = require('./routes/user.routes');
const categoriesRoutes = require('./routes/categories.routes');
const worksRoutes = require('./routes/works.routes');
db.sequelize.sync().then(()=> console.log('db is ready'));
app.use('/api/users', userRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/works', worksRoutes);*/