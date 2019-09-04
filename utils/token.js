const jwt = require('jsonwebtoken')
const config = require('./config')
const expirationTime = '2h' // 过期时间

module.exports = (payload) => {
    const token = jwt.sign({
        payload
    }, config.secret, {
        expiresIn: expirationTime
    })
    return token
}