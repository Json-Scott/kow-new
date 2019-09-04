const mongoose = require('mongoose')
// 数据库配置项
const CONF = {
    URL: 'localhost',
    PORT: 27017,
    DATABASE: 'mongo-test-new'
}
// 服务器端口号
const PORT = 8888
mongoose.set('useCreateIndex', true)
const DB = mongoose.connect(`mongodb://${CONF.URL}:${CONF.PORT}/${CONF.DATABASE}`, {
    useNewUrlParser: true
})
module.exports = {
    DB,
    CONF,
    PORT
}