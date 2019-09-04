const jwt = require('jsonwebtoken')
const config = require('./config')
module.exports = (token) => {
    jwt.verify(token, config.secret, (err, data) => {
        if (err) console.log(err)
        console.log(data)
    })
}