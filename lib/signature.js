const crypto = require('crypto')

class Signature {
    constructor({ accessKeyId, accessKeySecret, version = '2015-01-09', format = 'JSON' }) {
        this.accessKeyId = accessKeyId
        this.accessKeySecret = accessKeySecret
        this.version = version
        this.format = format
        this.signMethod = 'HMAC-SHA1'
        this.signVer = '1.0'
    }
    
    getSignature (params, httpMethod = 'GET') {
        let query = []
        for (let key in params) {
            let v = params[key]
            query.push(`${key}=${encodeURIComponent(v)}`)
        }

        query.sort()
        let queryRaw = query.join('&')
        let preSign = `${httpMethod}&${encodeURIComponent('/')}&${encodeURIComponent(queryRaw)}`
        let key = `${this.accessKeySecret}&`;
        let hmac = crypto.createHmac('sha1', key)
        return hmac.update(preSign).digest('base64')
    }

    getReqParams (params, httpMethod = 'GET') {
        let defParams = {
            Format: this.format,
            Version: this.version,
            AccessKeyId: this.accessKeyId,
            SignatureMethod: this.signMethod,
            Timestamp: this.getTimestamp(),
            SignatureVersion: this.signVer,
            SignatureNonce: this.getNonce()
        }
        let newParams = Object.assign({}, defParams, params)
        let sign = this.getSignature(newParams, httpMethod)
        newParams.Signature = sign
        return newParams
    }

    getTimestamp () {
        return new Date().toISOString()
    }

    getNonce () {
        return Date.now() + parseInt(Math.random() * 89999 + 10000)
    }
}

module.exports = Signature