const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = (req, res, next) => {

    const fullToken = req.headers.authorization

    if (fullToken.startsWith('Bearer')) {
        const token = fullToken.split(' ')[1]

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        req.user = decoded

    } else {
        return res.status(400).send({ msg: "Auth header bearer is missing" })
    }

    return next()

}

const doctor = (req, res, next) => {

    if (req.user.role === 'Doctor') {
        return next()
    } else {
        return res.status(401).send({ msg: "User Unauthorized" })
    }
}

const admin = (req, res, next) => {
    if (req.user.role === 'Admin') {
        return next()
    } else {
        return res.status(401).send({ msg: 'User Unauthorized' })
    }
}


module.exports = { auth, doctor, admin }