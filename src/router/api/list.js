const Router = require('koa-router')
const User = require('../../model/User')
const List = require('../../model/List')
const tools = require('../../utils/tools')
const router = new Router()

/**
 * @route POST /api/list/addList
 * @desc 添加数据列表接口地址
 * @access 公开
 */
router.post('/addList', async ctx => {
    const findResult = await List.find({
        name: ctx.request.body.name
    })
    if (findResult.length > 0) {
        ctx.status = 500
        ctx.body = {
            err: '名称已存在'
        }
    } else {
        const inputImgUrl = ctx.request.body.imgUrl
        // 有 img
        if (inputImgUrl && inputImgUrl !== undefined && inputImgUrl !== null && inputImgUrl !== '') {
            const newList = new List({
                // uid: ctx.request.body.uid,
                name: ctx.request.body.name,
                content: ctx.request.body.content,
                imgUrl: inputImgUrl
            })
            await newList.save().then(list => {
                ctx.body = list
            }).catch(e => {
                console.log(e)
            })
            ctx.status = 200
            ctx.body = newList
        } else {
            // 无 img
            const newList = new List({
                // uid: ctx.request.body.uid,
                name: ctx.request.body.name,
                content: ctx.request.body.content
            })
            await newList.save().then(list => {
                ctx.body = list
            }).catch(e => {
                console.log(e)
            })
            ctx.status = 200
            ctx.body = newList
        }
    }
})

/**
 * @route POST /api/list/getList
 * @desc 添加数据列表接口地址
 * @access 公开
 */
router.post('/getList', async ctx => {
    const findResult = await List.find({}).populate('cid').exec((err, docs) => {
        console.log(docs)
    })
    // 存在这条数据
    if (findResult.length === 0) {
        ctx.status = 500
        ctx.body = {
            err: '名称重复'
        }
    } else {
        ctx.status = 200
        ctx.body = {
            data: findResult[0],
            success: 'true'
        }
    }
})

/**
 * @route POST /api/list/updateList
 * @desc 更新数据列表接口地址
 * @access 公开
 */
router.post('/updateList', async ctx => {
    const findResult = await List.find({
        uid: ctx.request.body.uid
    })

})

/**
 * @route POST /api/list/deleteList
 * @desc 删除数据列表项接口地址
 * @access 公开
 */
router.post('/deleteList', async ctx => {
    const findResult = await List.find({
        uid: ctx.request.body.uid
    })
    const name = findResult[0].name
    const cancelEnable = findResult[0].enable
    if (name) {
        if (cancelEnable === 'N') {
            await List.delete({
                name: ctx.request.body.name
            })
            ctx.status = 200
            ctx.body = {
                success: `名称为：${name} 的数据删除成功！`
            }
        } else {
            await List.update({
                name: ctx.request.body.name
            }, {
                enable: 'Y'
            })
            ctx.status = 200
            ctx.body = {
                success: `名称为：${ctx.request.body.name} 的数据删除成功！更新为${findResult[0].enable}。`
            }
        }
    } else {
        ctx.status = 500
        ctx.body = {
            success: `名称为：${ctx.request.body.name} 的数据删除失败！`
        }
    }
})

/**
 * @route POST /api/list/updateStatus
 * @desc 更新数据列表项是否可永久删除状态的接口地址
 * @access 公开
 */
router.post('/updateStatus', async ctx => {
    const findResult = await List.find({
        uid: ctx.request.body.uid
    })
    const cancelEnable = findResult[0].enable
    if (cancelEnable === 'Y') {
        await List.update({
            name: ctx.request.body.name
        }, {
            enable: 'N'
        })
        ctx.status = 200
        ctx.body = {
            success: `当前状态为：${findResult[0].enable}`
        }
    } else {
        await List.update({
            name: ctx.request.body.name
        }, {
            enable: 'Y'
        })
        ctx.status = 200
        ctx.body = {
            success: `当前状态为：${findResult[0].enable}`
        }
    }
})

module.exports = router.routes()