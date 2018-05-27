let express = require('express');
let request = require('request');
let common = require('../common/common.json'); // 引用公共文件
let router = express.Router();

/**
 * @api {get} /index 请求首页数据
 * @apiVersion 1.0.0
 * @apiName 获取首页数据
 * @apiGroup index
 *
 *
 * @apiSuccess {Number} flag 是否获取到数据 1成功 0失败
 * @apiSuccess {Array} books 返回书籍内容
 * @apiSuccess {String} msg  返回信息
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *      "flag": 1,
 *      "books": [
 *          {
 *             "_id": "5816b415b06d1d32157790b1",
 *            "title": "圣墟",
 *            "author": "辰东",
 *            "shortIntro": "在破败中崛起，在寂灭中复苏。沧海成尘，雷电枯竭，那一缕幽雾又一次临近大地，世间的枷锁被打开了，一个全新的世界就此揭开神秘的一角……",
 *            "cover": "http://statics.zhuishushenqi.com/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1228859%2F1228859_fac7917a960547eb953edf0b740cef3a.jpg%2F",
 *            "site": "zhuishuvip",
 *            "majorCate": "玄幻",
 *            "minorCate": "东方玄幻",
 *            "allowMonthly": false,
 *            "banned": 0,
 *            "latelyFollower": 283375,
 *            "retentionRatio": "73.42"
 *          }
 *      ],
 *      "msg": "OK"
 *    }
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     { "flag": 0, "msg": "rankingId有问题" }
 */

router.get('/', function(req, res, next) {
  // 请求追书最热榜 Top100
  request.get(`${common.API}/ranking/54d42d92321052167dfb75e3`, function (error, response, body) {
    if (error){
      res.send(JSON.stringify({"flag": 0, "msg": "请求出错了..."}));
    }
    
    // 解析返回数据
    body = JSON.parse(body);

    if (body.ok){
      // 取前20条，并添加图片url链接
      let books = body.ranking.books.slice(0, 19);
      books.forEach(element => {
        element.cover = common.PIC + element.cover;
      });

      res.send(JSON.stringify({ "flag": 1, "books": books, "msg": "OK" }));
    }else{
      res.send(JSON.stringify({ "flag": 0, "msg": "rankingId有问题" }));
    }  
  });
});

module.exports = router;