let express = require('express');
let request = require('request');
let common = require('../common/common.json'); // 引用公共文件
let router = express.Router();

/**
 * @api {get} /chapter 获取小说文章列表
 * @apiVersion 1.0.0
 * @apiName 小说文章列表
 * @apiGroup chapter
 *
 * @apiParam {String} id 小说id
 *
 * @apiSuccess {Number} flag 是否获取到数据 1成功 0失败
 * @apiSuccess {Array} books 默认返回第二个源
 * @apiSuccess {String} msg  返回信息
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *           "flag": 1,
 *           "id": "57416370ccc94e4b41df80cc",
 *           "chapters": [
 *               {
 *                   "title": "第1章 星空中的青铜巨棺",
 *                   "link": "http://book.my716.com/getBooks.aspx?method=content&bookId=42216&chapterFile=U_42216_201709300848186368_0866_1.txt",
 *                   "chapterCover": "",
 *                   "totalpage": 0,
 *                   "partsize": 0,
 *                   "order": 0,
 *                   "currency": 0,
 *                   "unreadble": false,
 *                   "isVip": false
 *                   "n": 0
 *               }
 *           ],
 *           "msg": "OK"
 *       }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "flag": 0,
 *        "msg": "传入错误的ID..."
 *     }
 */

router.get('/', function (req, res, next) {
    if (!req.query.id){
        return res.send(JSON.stringify({ "flag": 0, "msg": "请传入ID..." }));
    }
    // req.query.id 编码转义
    let id = encodeURIComponent(req.query.id);
    request.get(`${common.API}/atoc/${id}?view=chapters`, function (err, response, body) {
        if (err) {
            return res.send(JSON.stringify({ "flag": 0, "msg": "请求出错了..." }));
        }

        if (body == "wrong param" || body.indexOf('Cannot GET /atoc/') != -1){
            return  res.send(JSON.stringify({ "flag": 0, "msg": "传入错误的ID..." }));
        }else{
            // 解析返回的数据
            body = JSON.parse(body);
            if (body.chapters.length > 0) {
                body.chapters.forEach((el, index) => {
                    el.n = index;
                });
                return res.send(JSON.stringify({ "flag": 1,"id": body._id,  "chapters": body.chapters, "msg": "OK" }));
           }
        }
        
    });
});

module.exports = router;