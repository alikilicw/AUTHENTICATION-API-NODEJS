class APIResponse {
    constructor(data = null, message = null, status = null) {
        this.data = data
        this.message = message
        this.status = status
    }

    positiveRes(res) {
        return res.status(this.status).json({
            data : this.data ?? "null",
            message : this.message ?? "İşlem Başarılı.."
        })
    }

    negativeRes(res) {
        return res.status(this.status).json({
            message : this.message ?? "İşlem Başarısız.."
        })
    }
}


module.exports = APIResponse