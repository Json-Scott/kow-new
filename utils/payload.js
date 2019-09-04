class Payload {
    constructor(uid, phone, password) {
        if (uid) {
            this.uid = uid
        }
        if (phone) {
            this.phone = phone
        }
        if (password) {
            this.password = password
        }
    }
}
module.exports = {
    Payload
}