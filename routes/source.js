let express = require('express');
let request = require('request');
let common = require('../common/common.json'); // 引用公共文件
let router = express.Router();

/** 
  获取小说源
  返回盗版源和正版源
  param id {String} 是首页和搜索返回接口 books[i].id
  param n {Number || String}  使用第几个源，可以不用传参默认 1
  http://api.zhuishushenqi.com/atoc?view=summary&book=${bookID}
*/
router.get('/', function (req, res, next) {
    if (!req.query.id) {
        res.send(JSON.stringify({ "flag": 0, "msg": "请传入ID..." }));
    }
    // req.query.id 编码转义
    let id = encodeURI(req.query.id);
    request.get(`${common.API}/atoc?view=summary&book=${id}`, function (err, response, body){
        if(err){
            res.send(JSON.stringify({ "flag": 0, "msg": "请求出错了..." }));
        }
        
        // 解析返回的数据
        body = JSON.parse(body);
        // 判断是否返回内容
        if (body.length == 0){
            res.send(JSON.stringify({ "flag": 0, "msg": "没有获取到小说源，换个小说看吧" }));
        }

        // 第一个源是正版源，是收费加密的，所以默认选中第二个源
        let n = parseInt(req.query.n);
        if (isNaN(n) || n == 0){
            n = 1;
        }

        // 判断n是否大于源数据的长度
        if (n >= body.length){
            res.send(JSON.stringify({ "flag": 0, "msg": "n的参数值不正确，没有那个源" }));
        }else{
            res.send(JSON.stringify({ "flag": 1, "books": body[n], "msg": "OK" }));
        }
    });
});

module.exports = router;