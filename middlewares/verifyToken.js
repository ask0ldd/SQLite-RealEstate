const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    // const token = req.headers['x-access-token']
    try{
    const token = req.headers.authorization.split(' ')[1]
    if (token == null) { return res.status(403).send({ message: 'No token provided!' }) }
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
    req.auth = { userId : decodedToken.userId }
    }catch(error){
        res.status(401).json({
			error: new Error('You are not authenticated.')
		})
    }
}