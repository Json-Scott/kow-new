const mongoose = require('mongoose')
const tools = require('../../utils/tools')
const Schema = mongoose.Schema
const TABLE = 'users'
const userSchema = new Schema({
    uid: {
        type: String,
        unique: true,
        default: tools.uid
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    login_date: {
        type: Date,
        default: Date.now()
    },
    sign_date: {
        type: Date,
        default: Date.now()
    },
    login_count: {
        type: Number
    },
    enable: {
        type: String,
        default: 'Y'
    }
})


module.exports = User = mongoose.model(TABLE, userSchema)