const express = require('express')
// const User = require('../models/user.model.js')
const router = express.Router()

/*router.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body

    const user = await User.create({ name, email, password })

    res.status(201).json(user)
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})*/

router.get('/', (req, res) => {
    /*try{
        res.json({id:1, name:'doe', firstname:'john'})
    } catch (error){
        console.error('Error finding the user:', error)
        res.status(500).json({ error: 'Internal server error' })
    }*/
    // console.log('test')
    return res.status(200).json({id:'1', name:'doe', firstname:'john'})
})

router.get('/1', (req, res) => {
	res.send('Helloooo World!')
})

module.exports = router
