const mongoose = require('mongoose')
const Schema = mongoose.Schema
const TABLE = 'lists'

const listSchema = new Schema({
    cid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        default: 'http://localhost:8888/api/list/listMock.png'
    },
    createTime: {
        type: Date,
        default: Date.now()
    },
    enable: {
        type: String,
        default: 'Y'
    }
})

module.exports = List = mongoose.model(TABLE, listSchema, 'Lists')