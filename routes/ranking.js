let express = require('express');
let request = require('request');
let common = require('../common/common.json'); // 引用公共文件
let router = express.Router();

/** 
  获取排行榜
  返回排行榜
  param id {String} 没有传参数就是获取全部榜单，否则根据参数获取榜单
  http://api.zhuishushenqi.com/ranking/gender
  http://api.zhuishushenqi.com/ranking/${id}
*/

router.get('/', function (req, res, next) {
    // 获取全部榜单
    request.get(`${common.API}/ranking/gender`, function (err, response, body) {
        if (err) {
            res.send(JSON.stringify({ "flag": 0, "msg": "请求出错了..." }));
        }

        // 解析返回的数据
        body = JSON.parse(body);

        if (body.ok) {
            let ranking = {
                male: body.male,
                picture: body.picture,
                epub: body.epub,
                female: body.female
            };
            res.send(JSON.stringify({ "flag": 1, "ranking": ranking, "msg": "OK" }));
        } else {
            res.send(JSON.stringify({ "flag": 0, "msg": "出错了" }));
        }
    });
});

router.get('/:id', function (req, res, next) {
    if (req.params.id) {
        // req.param.id 编码转义
        let id = encodeURIComponent(req.params.id);

        // 根据id获取榜单
        request.get(`${common.API}/ranking/${id}`, function (err, response, body) {
            if (err) {
                res.send(JSON.stringify({ "flag": 0, "msg": "请求出错了..." }));
            }

            // 解析返回的数据
            body = JSON.parse(body);

            if (body.ok) {
                res.send(JSON.stringify({ "flag": 1, "ranking": body.ranking, "msg": "OK" }));
            } else {
                res.send(JSON.stringify({ "flag": 0, "msg": "传入id错误" }));
            }
        });
    }else{
        res.send(JSON.stringify({ "flag": 0, "msg": "id没有传" }));
    }
});

module.exports = router;