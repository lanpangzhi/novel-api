let express = require('express');
let request = require('request');
let common = require('../common/common.json'); // 引用公共文件
let router = express.Router();

/** 
  获取小说文章内容
  返回小说文章内容
  param link {String} 是小说文章列表接口 chapters[0].link
  http://chapter2.zhuishushenqi.com/chapter/${link}
*/
router.get('/', function (req, res, next) {
    if (!req.query.link) {
        res.send(JSON.stringify({ "flag": 0, "msg": "请传入link..." }));
    }
    // req.query.link 编码转义
    let link = encodeURIComponent(req.query.link);
    request.get(`${common.CHAPTER}/chapter/${link}`, function (err, response, body) {
        if (err) {
            res.send(JSON.stringify({ "flag": 0, "msg": "请求出错了..." }));
        }

        // 解析返回的数据
        body = JSON.parse(body);

        if (body.ok){
            res.send(JSON.stringify({ "flag": 1, "chapter": body.chapter, "msg": "OK" }));
        }else{
            res.send(JSON.stringify({ "flag": 0, "msg": "传入link有错误" }));
        }
    });
});

module.exports = router;