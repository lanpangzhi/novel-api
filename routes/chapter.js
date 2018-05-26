let express = require('express');
let request = require('request');
let common = require('../common/common.json'); // 引用公共文件
let router = express.Router();

/** 
  获取小说文章列表
  返回小说文章列表
  param id {String} 是小说源接口 books.id
  http://api.zhuishushenqi.com/atoc/${id}?view=chapters
*/
router.get('/', function (req, res, next) {
    if (!req.query.id){
        res.send(JSON.stringify({ "flag": 0, "msg": "请传入ID..." }));
    }
    // req.query.id 编码转义
    let id = encodeURIComponent(req.query.id);
    request.get(`${common.API}/atoc/${id}?view=chapters`, function (err, response, body) {
        if (err) {
            res.send(JSON.stringify({ "flag": 0, "msg": "请求出错了..." }));
        }

        if (body == "wrong param"){
            res.send(JSON.stringify({ "flag": 0, "msg": "传入错误的ID..." }));
        }else{
            // 解析返回的数据
            body = JSON.parse(body);
            if (body.chapters.length > 0) {
                res.send(JSON.stringify({ "flag": 1,"id": body._id,  "chapters": body.chapters, "msg": "OK" }));
           }
        }
        
    });
});

module.exports = router;