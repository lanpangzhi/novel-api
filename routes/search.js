let express = require('express');
let request = require('request');
let common = require('../common/common.json'); // 引用公共文件
let router = express.Router();

/** 
  模糊搜索接口
  返回模糊搜索前40条数据
  http://api.zhuishushenqi.com/book/fuzzy-search?query={name}
*/
router.get('/', function(req, res, next) {
  // 判断query参数有没有传递过来
  if (req.query.query){
    // req.query.query 编码转义
    let query = encodeURIComponent(req.query.query);
    request.get(`${common.API}/book/fuzzy-search?query=${query}`, function (error, response, body) {
      if (error){
        res.send(JSON.stringify({ "flag": 0, "msg": "请求出错了..." }));
      }

       // 解析返回数据
      body = JSON.parse(body);

      if (body.ok){
        if (body.books.length == 0){
          res.send(JSON.stringify({ "flag": 0, "msg": "没有找到书籍，换个名字试试吧。" }));
        }
        
        // 取前40条，并添加图片url链接
        let books = body.books.slice(0, 39);
        books.forEach(element => {
          element.cover = common.PIC + element.cover;
        });

        res.send(JSON.stringify({ "flag": 1, "books": books, "msg": "OK" }));
      }else{
        res.send(JSON.stringify({ "flag": 0, "msg": "请求出错了..." }));
      }
    });
  }else{
    res.send(JSON.stringify({"flag": 0, "msg": "请传入query参数"}));
  }
  
});

module.exports = router;