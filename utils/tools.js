module.exports = {
    // 用户uid
    uid: () => {
        let s = []
        let hexDigits = "0123456789";
        for (let i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
        }
        // bits 12-15 of the time_hi_and_version field to 0010
        s[14] = "4"
        // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-"
        let uuid = s.join("")
        return uuid
    },
    // 深拷贝
    extend: (target, source) => {
        for (let obj in source) {
            target[obj] = source[obj]
        }
        return target
    },
    // 格式化时间
    Format: (date, fmt) => {
        let o = {
            "M+": date.getMonth() + 1, //月份 
            "d+": date.getDate(), //日 
            "h+": date.getHours(), //小时 
            "m+": date.getMinutes(), //分 
            "s+": date.getSeconds(), //秒 
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds() //毫秒 
        }
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
        return fmt
    },
    // 计算文件大小
    getfilesize: (size) => {
        if (!size)
            return ""
        let num = 1024.00 // byte
        if (size < num)
            return size + "B"
        if (size < Math.pow(num, 2))
            return (size / num).toFixed(2) + "K" // kb
        if (size < Math.pow(num, 3))
            return (size / Math.pow(num, 2)).toFixed(2) + "M" // M
        if (size < Math.pow(num, 4))
            return (size / Math.pow(num, 3)).toFixed(2) + "G" // G
        return (size / Math.pow(num, 4)).toFixed(2) + "T" // T
    },
    // 校验手机号
    checkMobile: (str) => {
        let re = /^1(3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])\d{8}$/
        if (re.test(str)) {
            return true
        } else {
            return false
        }
    },
    // 判断是否为全部为数字
    checkBankNumType: (str) => {
        if (str.match(/^[0-9]*$/)) {
            return true
        } else {
            return false
        }
    },
    // 判断字符串是否有效
    avalibleStr: (str) => {
        if (!str) {
            return false
        }
        if (str == undefined) { // 找不到
            return false
        }
        if (str.match(/^\s+$/)) { // 全是空或者全是换行
            return false
        }
        if (str.match(/^[ ]+$/)) { // 全是空格
            return false
        }
        if (str.match(/^[ ]*$/)) { // 全是空格或是空
            return false
        }
        if (str.match(/^\s*$/)) { // 全是空/换行/空格
            return false
        }
        return true
    },
    // 当前时间
    currentYMD: () => {
        let myDate = new Date();
        let months = (myDate.getMonth() + 1)
        if (months < 10) {
            months = "0" + months
        }
        let data = myDate.getDate()
        if (data < 10) {
            data = "0" + data
        }
        let dateTime =
            myDate.getFullYear() +
            "." + months +
            "." +
            data
        return dateTime
    },
    // 时间戳转时间格式 Y-M-D
    timeStampYMD2: (timestamp) => {
        if (timestamp === undefined) {
            return {
                fullDate: ""
            }
        }
        const date = new Date(timestamp)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
        const formatNumber = (n) => {
            n = n.toString()
            return n[1] ? n : '0' + n
        }
        return {
            year: year,
            HMS: [hour, minute, second].map(formatNumber).join(':'),
            YTD: [year, month, day].map(formatNumber).join('-'),
            fullDate: year + '-' + month + '-' + day + ' '
        }
    },
    // 时间戳转时间格式 MM月DD日 hh:mm
    timeStampMDHM: (timestamp) => {
        if (timestamp === undefined) {
            return {
                fullDate: ""
            }
        }
        const date = new Date(timestamp)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
        const formatNumber = (n) => {
            n = n.toString()
            return n[1] ? n : '0' + n
        }
        return {
            year: year,
            HMS: [hour, minute, second].map(formatNumber).join(':'),
            YTD: [year, month, day].map(formatNumber).join('-'),
            fullDate: year + '-' + month + '-' + day + ' ' + [hour, minute, second].map(formatNumber).join(':')
        }
    },
    // 时间戳转时间格式 yyyy/MM/DD
    timeStampYMD: (timestamp) => {
        const date = new Date(timestamp)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
        const formatNumber = (n) => {
            n = n.toString()
            return n[1] ? n : '0' + n
        }
        return {
            year: year,
            HMS: [hour, minute, second].map(formatNumber).join(':'),
            YTD: [year, month, day].map(formatNumber).join('-'),
            fullDate: [year, month, day].map(formatNumber).join('/')
        }
    },
    // 时间戳转时间格式
    timeStamp: (timestamp) => {
        const date = new Date(timestamp)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
        const formatNumber = (n) => {
            n = n.toString()
            return n[1] ? n : '0' + n
        }
        return {
            year: year,
            HMS: [hour, minute, second].map(formatNumber).join(':'),
            YTD: [year, month, day].map(formatNumber).join('-'),
            fullDate: [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
        }
    },
    // 时间戳转时间格式
    timeYMStamp: (timestamp) => {
        const date = new Date(timestamp)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
        const formatNumber = (n) => {
            n = n.toString()
            return n[1] ? n : '0' + n
        }
        return {
            year: year,
            HMS: [hour, minute, second].map(formatNumber).join(':'),
            YTD: [year, month, day].map(formatNumber).join('-'),
            fullDate: [year, month, day].map(formatNumber).join('-')
        }
    },
    // 时间戳转换成几分钟前,几小时前,几天前
    formatMsgTime: (dateTimeStamp) => {
        let result
        let minute = 1000 * 60
        let hour = minute * 60
        let day = hour * 24
        let halfamonth = day * 15
        let month = day * 30
        let now = new Date().getTime()
        let diffValue = now - dateTimeStamp
        if (diffValue < 0) {
            return
        }
        let monthC = diffValue / month
        let weekC = diffValue / (7 * day)
        let dayC = diffValue / day
        let hourC = diffValue / hour
        let minC = diffValue / minute
        if (monthC >= 1) {
            if (monthC <= 12)
                result = "" + parseInt(monthC) + "月前"
            else {
                result = "" + parseInt(monthC / 12) + "年前"
            }
        } else if (weekC >= 1) {
            result = "" + parseInt(weekC) + "周前"
        } else if (dayC >= 1) {
            result = "" + parseInt(dayC) + "天前"
        } else if (hourC >= 1) {
            result = "" + parseInt(hourC) + "小时前"
        } else if (minC >= 1) {
            result = "" + parseInt(minC) + "分钟前"
        } else {
            result = "刚刚"
        }
        return result
    }
}