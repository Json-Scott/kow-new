const Router = require('koa-router')
const User = require('../../model/User')
const List = require('../../model/List')
const {
    Payload
} = require('../../../utils/payload')
const token = require('../../../utils/token')
// const tools = require('../../../utils/tools')
const router = new Router()

/**
 * @route POST /api/user/register
 * @desc 注册接口地址
 * @access 公开
 */
router.post('/register', async ctx => {
    const findResult = await User.find({
        phone: ctx.request.body.phone
    })
    if (findResult.length > 0) {
        ctx.status = 500
        ctx.body = {
            err: '手机号已存在'
        }
    } else {
        const regUser = new User({
            phone: ctx.request.body.phone,
            password: ctx.request.body.password
        })
        await regUser.save().then(user => {
            ctx.body = user
        }).catch(e => {
            console.log(e)
        })
        ctx.status = 200
        ctx.body = regUser
    }
})

/**
 * @route POST /api/user/login
 * @desc 登录接口地址
 * @access 公开
 */
router.post('/login', async ctx => {
    const findResult = await User.find({
        phone: ctx.request.body.phone
    })
    const cancelEnable = findResult[0].enable
    const payload = new Payload(findResult[0].uid, ctx.request.body.phone, ctx.request.body.password)
    if (findResult.length === 0) {
        ctx.status = 500
        ctx.body = {
            err: '手机号已存在'
        }
    } else {
        if (cancelEnable === 'Y') {
            ctx.status = 200
            findResult[0].token = token(payload)
            await User(findResult[0]).save().then((err, docs) => {
                if (err) {
                    console.log(err)
                    console.log(';;;;;;', docs)
                    // ctx.body = {
                    //     code: 1,
                    //     msg: '登录失败'
                    // }
                    
                    // return
                } else {
                    ctx.body = {
                        code: 0,
                        msg: '登陆成功'
                    }
                }
            })
        } else {
            ctx.status = 500
            ctx.body = {
                err: '手机号不存在'
            }
        }
    }
})

/**
 * @route POST /api/user/getUserInfo
 * @desc 获取用户关联的 list
 * @access 公开
 */
router.post('/getUserInfo', async ctx => {
    let findUserResult = await User.find({
        uid: ctx.request.body.uid
    })
    let findListResult = await List.find({
        uid: ctx.request.body.uid
    })
    ctx.body = {
        user: findUserResult[0],
        list: findListResult
    }
})

/**
 * @route POST /api/user/cancel
 * @desc 注销用户接口地址
 * @access 公开
 */
router.post('/cancel', async ctx => {
    const findResult = await User.find({
        phone: ctx.request.body.phone
    })
    const cancelEnable = findResult[0].enable
    if (findResult[0].phone && cancelEnable === 'Y') {
        await User.update({
            phone: ctx.request.body.phone
        }, {
            enable: 'N'
        })
        console.log(ctx.session.phone)
        ctx.status = 200
        ctx.body = {
            success: '注销成功'
        }
    } else {
        ctx.status = 500
        ctx.body = {
            err: '注销失败'
        }
    }
})

/**
 * @route POST /api/user/restore
 * @desc 恢复用户账户接口地址
 * @access 公开
 */
router.post('/restore', async ctx => {
    const findResult = await User.find({
        phone: ctx.request.body.phone
    })
    const phone = findResult[0].phone
    const cancelEnable = findResult[0].enable
    if (phone && cancelEnable === 'N') {
        await User.update({
            phone: ctx.request.body.phone
        }, {
            enable: 'Y'
        })
        ctx.status = 200
        ctx.body = {
            success: '用户账户恢复成功'
        }
    } else {
        ctx.status = 500
        ctx.body = {
            err: '用户账户恢复失败'
        }
    }
})

module.exports = router.routes()