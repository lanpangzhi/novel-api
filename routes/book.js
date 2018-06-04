let express = require('express');
let request = require('request');
let common = require('../common/common.json'); // 引用公共文件
let router = express.Router();

/**
 * @api {get} /book:id 获取小说信息
 * @apiVersion 1.0.0
 * @apiName 获取小说信息
 * @apiGroup book
 *
 * @apiParam {String} id 书籍id
 *
 * @apiSuccess {Number} flag 是否获取到数据 1成功 0失败
 * @apiSuccess {JSON} book  书籍信息
 * @apiSuccess {String} msg  返回信息
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *           "flag": 1,
 *           "book": {
 *               "_id": "5816b415b06d1d32157790b1",
 *               "title": "圣墟",
 *               "author": "辰东",
 *               "longIntro": "在破败中崛起，在寂灭中复苏。沧海成尘，雷电枯竭，那一缕幽雾又一次临近大地，世间的枷锁被打开了，一个全新的世界就此揭开神秘的一角……",
 *               "cover": "http://statics.zhuishushenqi.com/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1228859%2F1228859_d14f18e849b34420904ead54936e440a.jpg%2F",
 *               "majorCate": "玄幻",
 *               "minorCate": "东方玄幻",
 *               "creater": "iPhone 5s (UK+Europe+Asis+China)",
 *               "hiddenPackage": [],
 *               "apptype": [
 *                   0,
 *                   1,
 *                   4
 *               ],
 *               "rating": {
 *                   "count": 40809,
 *                   "score": 8.879,
 *                   "isEffect": true
 *               },
 *               "hasCopyright": true,
 *               "buytype": 2,
 *               "sizetype": -1,
 *               "superscript": "",
 *               "currency": 0,
 *               "contentType": "txt",
 *               "_le": false,
 *               "allowMonthly": false,
 *               "allowVoucher": true,
 *               "allowBeanVoucher": false,
 *               "hasCp": true,
 *               "postCount": 70783,
 *               "latelyFollower": 280426,
 *               "followerCount": 0,
 *               "wordCount": 4085239,
 *               "serializeWordCount": 4781,
 *               "retentionRatio": "73.98",
 *               "updated": "2018-06-03T03:09:57.256Z",
 *               "isSerial": true,
 *               "chaptersCount": 1079,
 *               "lastChapter": "第1081章 楚财大气粗",
 *               "gender": [
 *                   "male"
 *               ],
 *               "tags": [],
 *               "advertRead": true,
 *               "cat": "东方玄幻",
 *               "donate": false,
 *               "copyright": "阅文集团正版授权",
 *               "_gg": false,
 *               "discount": null,
 *               "limit": false
 *           },
 *           "msg": "OK"
 *       }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "flag": 0,
 *        "msg": "id没有传"
 *     }
 */

router.get('/:id', function (req, res, next) {
  if (req.params.id) {
    // req.param.id 编码转义
    let id = encodeURIComponent(req.params.id);

    // 根据id获取榜单
    request.get(`${common.API}/book/${id}`, function (err, response, body) {
      if (err) {
        return res.send(JSON.stringify({ "flag": 0, "msg": "请求出错了..." }));
      }

      // 解析返回的数据
      body = JSON.parse(body);
      body.cover = common.PIC + body.cover;

      if (body._id) {
        return res.send(JSON.stringify({ "flag": 1, "book": body, "msg": "OK" }));
      } else {
        return res.send(JSON.stringify({ "flag": 0, "msg": "传入id错误" }));
      }
    });
  } else {
    return res.send(JSON.stringify({ "flag": 0, "msg": "id没有传" }));
  }
});

module.exports = router;