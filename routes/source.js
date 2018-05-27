let express = require('express');
let request = require('request');
let common = require('../common/common.json'); // 引用公共文件
let router = express.Router();

/**
 * @api {get} /source 获取小说源正版和盗版
 * @apiVersion 1.0.0
 * @apiName 获取小说源
 * @apiGroup source
 *
 * @apiParam {String} id 小说id
 * @apiParam {Number} n（可选） 选择返回第几个源
 *
 * @apiSuccess {Number} flag 是否获取到数据 1成功 0失败
 * @apiSuccess {Array} books 默认返回第二个源
 * @apiSuccess {String} msg  返回信息
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "flag": 1,
 *          "books": {
 *              "_id": "581825122ed01394526750b0",
 *              "lastChapter": "第1068章 青州",
 *              "link": "http://book.my716.com/getBooks.aspx?method=chapterList&bookId=1228859",
 *              "source": "my176",
 *              "name": "176小说",
 *              "isCharge": false,
 *              "chaptersCount": 1066,
 *              "updated": "2018-05-26T17:53:40.233Z",
 *              "starting": false,
 *              "host": "book.my716.com"
 *          },
 *          "msg": "OK"
 *      }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "flag": 0,
 *        "msg": "请传入ID..."
 *     }
 */

router.get('/', function (req, res, next) {
    if (!req.query.id) {
       return res.send(JSON.stringify({ "flag": 0, "msg": "请传入ID..." }));
    }
    // req.query.id 编码转义
    let id = encodeURI(req.query.id);
    request.get(`${common.API}/atoc?view=summary&book=${id}`, function (err, response, body){
        if(err){
            return res.send(JSON.stringify({ "flag": 0, "msg": "请求出错了..." }));
        }
        
        // 解析返回的数据
        body = JSON.parse(body);
        // 判断是否返回内容
        if (body.ok === false){
            return res.send(JSON.stringify({ "flag": 0, "msg": "没有获取到小说源，换个小说看吧" }));
        }

        // 第一个源是正版源，是收费加密的，所以默认选中第二个源
        let n = parseInt(req.query.n);
        if (isNaN(n) || n == 0){
            n = 1;
        }
        
        // 判断n是否大于源数据的长度
        if (n >= body.length){
            return res.send(JSON.stringify({ "flag": 0, "msg": "n的参数值不正确，没有那个源" }));
        }else{
            return res.send(JSON.stringify({ "flag": 1, "books": body[n], "msg": "OK" }));
        }
    });
});

module.exports = router;