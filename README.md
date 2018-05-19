# alidns-signature

阿里云DNS开放API签名生成工具

### Usage

```bash
npm i alidns-signature -S
```

```javascript
const http = require('http')
const querystring = require('querystring')
const Signature = require('alidns-signature')
const sign = new Signature({
    accessKeyId: '',
    accessKeySecret: ''
})

// 获取解析记录API的专有参数
let query = sign.getReqParams({
    Action: 'DescribeDomainRecords',
    DomainName: 'example.com'
})

http.get('http://alidns.aliyuncs.com?' + querystring.stringify(query), function (res) {
    let buf = []
    res.on('data', buf.push.bind(buf)).on('end', function () {
        console.log(Buffer.concat(buf).toString())
    })
})
```

### Method

- **getReqParams(params[, httpMethod])**

  传入请求`query`对象和请求方法（默认为`GET`），返回包含公共参数的新对象

```javascript
const sign = new Signature({
    accessKeyId: '',
    accessKeySecret: ''
})

// 获取解析记录API的专有参数
let query = sign.getReqParams({
    Action: 'DescribeDomainRecords',
    DomainName: 'example.com'
})
/*
返回对象包含专有参数在内的全部参数，使用 querystring.stringify 序列化成字符串即可使用
{ Format: 'JSON',
  Version: '2015-01-09',
  AccessKeyId: 'LTAIqGVsYW7HAqEf',
  SignatureMethod: 'HMAC-SHA1',
  Timestamp: '2018-05-19T01:52:21.044Z',
  SignatureVersion: '1.0',
  SignatureNonce: 1526694752445,
  Action: 'DescribeDomainRecords',
  DomainName: 'guoyupeng.me',
  Signature: 'wySsR2XAsYhFRke+ZleO7rn9LFk=' }
*/
```

- **getSignature(params[, httpMethod])**

  传入请求`query`对象和请求方法（默认为`GET`），返回签名字符串

```javascript
const sign = new Signature({
    accessKeyId: '',
    accessKeySecret: ''
})

// 接口公共参数
let pubParams = {
    Format: 'JSON',
    Version: '2015-01-09',
    AccessKeyId: '',
    SignatureMethod: 'HMAC-SHA1',
    Timestamp: new Date().toUTCString(),
    SignatureVersion: '1.0',
    SignatureNonce: Date.now()
}

// 获取解析记录API的专有参数
let apiParams = {
    Action: 'DescribeDomainRecords',
    DomainName: 'example.com'
}

// 混合全部参数
let params = Object.assign({}, pubParams, apiParams);

let sign = sign.getSignature(params)
// return 'wySsR2XAsYhFRke+ZleO7rn9LFk='
```

