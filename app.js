const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const favicon = require('koa-favicon')
const static = require('koa-static')
const fs = require('fs')
const path = require('path')

const {
    DB,
    CONF,
    PORT
} = require('./src/db/db')
const user = require('./src/router/api/user')
const list = require('./src/router/api/list')

const app = new Koa()
const router = new Router()

app.use(bodyParser())
// 使用路由
app.use(router.routes()).use(router.allowedMethods())
// 配置跨域
app.use(cors({
    origin: (ctx) => {
        if (ctx.url.indexOf('/api') > -1) {
            return "*" // 允许来自所有域名请求
        }
        return 'm.scott.com:8888'
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
router.get('/', async ctx => {
    ctx.body = `位于端口: ${PORT} 的服务启动成功!\n\n数据库 ${CONF.DATABASE} 连接成功!`
})


// 加载静态文件
app.use(static(path.join(__dirname, './public')))
app.use(favicon(__dirname + './public/favicon.ico'))
app.use(ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./public/index.html');
})

/**
 * @desc 业务路由
 */

// user 列表
router.use('/api/user', user)

// mock 列表
router.use('/api/list', list)






// 连接数据库
try {
    DB.then(() => {
        console.log(`数据库 ${CONF.DATABASE} 连接成功!`)
    }).catch(e => {
        console.log(e)
    })
} catch (e) {
    console.log(e)
}
// 监听端口
app.listen(PORT, (err) => {
    if (!err) console.log(`位于端口: ${PORT} 的服务启动成功!`)
    else console.log(err)
})