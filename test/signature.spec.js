const http = require('http')
const querystring = require('querystring')
const Signature = require('../index')
const sign = new Signature({
    accessKeyId: '',
    accessKeySecret: ''
})

let query = sign.getReqParams({
    Action: 'DescribeDomainRecords',
    DomainName: 'example.com'
}, 'GET')

http.get('http://alidns.aliyuncs.com?' + querystring.stringify(query), function (res) {
    let buf = []
    res.on('data', buf.push.bind(buf)).on('end', function () {
        console.log(Buffer.concat(buf).toString())
    })
})