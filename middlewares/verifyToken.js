const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    // const token = req.headers['x-access-token']
    try{
        const token = req.headers.authorization.split(' ')[1]
        if (token == null) return res.status(403).json({ error: new Error('No token provided.') })
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        req.body.auth = { userId : decodedToken.userId }
        if (req.body.userId == null || req.body.userId !== decodedToken.userId) {
            res.status(401).json({ error: new Error('Invalid User Id.') })
        } else {
            next()
        }
    }catch(error){
        res.status(401).json({ error: new Error('You are not authenticated.')})
    }
}