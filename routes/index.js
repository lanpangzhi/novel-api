let express = require('express');
let request = require('request');
let common = require('../common/common.json'); // 引用公共文件
let router = express.Router();

/** 
  首页数据追书最热榜 Top100
  获取单一排行榜
  http://api.zhuishushenqi.com/ranking/{rankingId}
*/
router.get('/', function(req, res, next) {
  // 请求追书最热榜 Top100
  request.get(`${common.API}/ranking/54d42d92321052167dfb75e3`, function (error, response, body) {
    if (error){
      res.send(JSON.stringify({"flag": 0, "msg": "请求出错了..."}));
    }
    
    // 解析返回数据取20条，并添加图片url链接
    body = JSON.parse(body);
    let books = body.ranking.books.slice(0, 19);
    books.forEach(element => {
      element.cover = common.PIC + element.cover;
    });
  
    if (body.ok){
      res.send(JSON.stringify({ "flag": 1, "books": books, "msg": "OK" }));
    }else{
      res.send(JSON.stringify({ "flag": 0, "msg": "rankingId有问题" }));
    }  
  });
});

module.exports = router;
