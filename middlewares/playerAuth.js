const jwt = require('jsonwebtoken')

const playerAuth = (req, res, next) => {
    console.log(req.headers)
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(401).send('Unauthorized')
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) return res.status(403).send('Invalid token')
        req.player = payload
        next()
    })
}

module.exports = playerAuth