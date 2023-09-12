const jwt = require('jsonwebtoken')

verifyToken = (req, res, next) => {
    const configSecret = "RANDOM_TOKEN_SECRET"
    const token = req.headers['x-access-token']
    if (!token) { return res.status(403).send({ message: 'No token provided!' }) }

    jwt.verify(token, configSecret, (err, decoded) => {
        if (err) { return res.status(401).send({ message: 'Unauthorized!' }) }
        req.auth = { userId : decoded.id }
        next()
    })
}

module.exports = verifyToken