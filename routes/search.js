let express = require('express');
let request = require('request');
let common = require('../common/common.json'); // 引用公共文件
let router = express.Router();

/**
 * @api {get} /search 模糊搜索小说
 * @apiVersion 1.0.0
 * @apiName 模糊搜索小说
 * @apiGroup search
 *
 * @apiParam {String} query 搜索的关键字
 *
 * @apiSuccess {Number} flag 是否获取到数据 1成功 0失败
 * @apiSuccess {Array} books 返回搜索结果前40本小说
 * @apiSuccess {String} msg  返回信息
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "flag": 1,
 *         "books": [
 *             {
 *                 "_id": "50864bf69dacd30e3a000014",
 *                 "hasCp": true,
 *                 "title": "遮天",
 *                 "aliases": "",
 *                 "cat": "仙侠",
 *                 "author": "辰东",
 *                 "site": "zhuishuvip",
 *                 "cover": "http://statics.zhuishushenqi.com/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F42216%2F_42216_203892.jpg%2F",
 *                 "shortIntro": "冰冷与黑暗并存的宇宙深处，九具庞大的龙尸拉着一口青铜古棺，亘古长存。\n这是太空探测器在枯寂的宇宙中捕捉到的一幅极其震撼的画面。\n九龙拉棺，究竟是回到了上古，还是来到了星空的彼岸？\n一个浩大的仙侠世界，光怪陆离，神秘无尽。热血似火山沸腾，激情若瀚海汹涌，欲望如深渊无止境……\n登天路，踏歌行，弹指遮天。",
 *                 "lastChapter": "第一千八百二十二章 遮天大结局",
 *                 "retentionRatio": 64.3,
 *                 "banned": 0,
 *                 "allowMonthly": false,
 *                 "latelyFollower": 40292,
 *                 "wordCount": 6352116,
 *                 "contentType": "txt",
 *                 "superscript": "",
 *                 "sizetype": -1,
 *                 "highlight": {
 *                     "title": [
 *                         "遮",
 *                         "天"
 *                     ]
 *                 }
 *             }
 *         ],
 *         "msg": "OK"
 *     }
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "flag": 0,
 *        "msg": "请传入query参数"
 *     }
 */

router.get('/', function(req, res, next) {
  // 判断query参数有没有传递过来
  if (req.query.query){
    // req.query.query 编码转义
    let query = encodeURIComponent(req.query.query);
    request.get(`${common.API}/book/fuzzy-search?query=${query}`, function (error, response, body) {
      if (error){
        return res.send(JSON.stringify({ "flag": 0, "msg": "请求出错了..." }));
      }

       // 解析返回数据
      body = JSON.parse(body);

      if (body.ok){
        if (body.books.length == 0){
          return res.send(JSON.stringify({ "flag": 0, "msg": "没有找到书籍，换个名字试试吧。" }));
        }
        
        // 取前40条，并添加图片url链接
        let books = body.books.slice(0, 39);
        books.forEach(element => {
          element.cover = common.PIC + element.cover;
        });

        return res.send(JSON.stringify({ "flag": 1, "books": books, "msg": "OK" }));
      }else{
        return res.send(JSON.stringify({ "flag": 0, "msg": "请求出错了..." }));
      }
    });
  }else{
    res.send(JSON.stringify({"flag": 0, "msg": "请传入query参数"}));
  }
  
});

module.exports = router;