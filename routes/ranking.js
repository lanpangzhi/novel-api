let express = require('express');
let request = require('request');
let common = require('../common/common.json'); // 引用公共文件
let router = express.Router();

/**
 * @api {get} /ranking:id 获取排行榜
 * @apiVersion 1.0.0
 * @apiName 获取排行榜
 * @apiGroup ranking
 *
 * @apiParam {String} id （可选）没有传参数就是获取全部榜单，否则根据排行榜id获取榜单
 *
 * @apiSuccess {Number} flag 是否获取到数据 1成功 0失败
 * @apiSuccess {Array} ranking 排行榜数据
 * @apiSuccess {String} msg  返回信息
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *         "flag": 1,
 *         "ranking": {
 *             "male": [
 *                 {
 *                     "_id": "54d42d92321052167dfb75e3",
 *                     "title": "追书最热榜 Top100",
 *                     "cover": "/ranking-cover/142319144267827",
 *                     "collapse": false,
 *                     "monthRank": "564d820bc319238a644fb408",
 *                     "totalRank": "564d8494fe996c25652644d2",
 *                     "shortTitle": "最热榜"
 *                 }
 *             ],
 *             "picture": [
 *                 {
 *                     "_id": "5a322ef4fc84c2b8efaa8335",
 *                     "title": "人气榜",
 *                     "cover": "/ranking-cover/142319144267827",
 *                     "collapse": false,
 *                     "shortTitle": "人气榜"
 *                 }
 *             ],
 *             "epub": [
 *                 {
 *                     "_id": "5a323096fc84c2b8efab2482",
 *                     "title": "热搜榜",
 *                     "cover": "/ranking-cover/142319144267827",
 *                     "collapse": false,
 *                     "shortTitle": "热搜榜"
 *                 }
 *             ],
 *             "female": [
 *                 {
 *                     "_id": "54d43437d47d13ff21cad58b",
 *                     "title": "追书最热榜 Top100",
 *                     "cover": "/ranking-cover/142319314350435",
 *                     "collapse": false,
 *                     "monthRank": "564d853484665f97662d0810",
 *                     "totalRank": "564d85b6dd2bd1ec660ea8e2",
 *                     "shortTitle": "最热榜"
 *                 }
 *             ]
 *         },
 *         "msg": "OK"
 *       }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "flag": 0,
 *        "msg": "传入id错误"
 *     }
 */

router.get('/', function (req, res, next) {
    // 获取全部榜单
    request.get(`${common.API}/ranking/gender`, function (err, response, body) {
        if (err) {
            return res.send(JSON.stringify({ "flag": 0, "msg": "请求出错了..." }));
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
            return res.send(JSON.stringify({ "flag": 1, "ranking": ranking, "msg": "OK" }));
        } else {
            return res.send(JSON.stringify({ "flag": 0, "msg": "出错了" }));
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
                return res.send(JSON.stringify({ "flag": 0, "msg": "请求出错了..." }));
            }

            // 解析返回的数据
            body = JSON.parse(body);

            if (body.ok) {
                return res.send(JSON.stringify({ "flag": 1, "ranking": body.ranking, "msg": "OK" }));
            } else {
                return res.send(JSON.stringify({ "flag": 0, "msg": "传入id错误" }));
            }
        });
    }else{
        return res.send(JSON.stringify({ "flag": 0, "msg": "id没有传" }));
    }
});

module.exports = router;