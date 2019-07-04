# novel-api
一个小说接口API服务

1.0版本:

技术栈使用express-generator、express、request、morgan、file-stream-rotator。接口用追书神器API。
线上访问地址https://api.langpz.com/

目前接口设计有首页，小说详情页，搜索，小说文章列表页，排行API。
```
git clone https://github.com/lanpangzhi/novel-api.git
cd novel-api
npm install
// Linux MacOS
DEBUG=novel-api:* & npm start
// windows 
set DEBUG=novel-api:* & npm start
```

生成api文档
```
npm run doc
需要自己配置nginx解析静态资源
生成的文档在public目录下
```

- [使用Express开发小说API接口服务1.0（一）](http://blog.langpz.com/%E4%BD%BF%E7%94%A8Express%E5%BC%80%E5%8F%91%E5%B0%8F%E8%AF%B4API%E6%8E%A5%E5%8F%A3%E6%9C%8D%E5%8A%A1.html)
- [使用Express开发小说API接口服务1.0（二）](http://blog.langpz.com/%E4%BD%BF%E7%94%A8Express%E5%BC%80%E5%8F%91%E5%B0%8F%E8%AF%B4API%E6%8E%A5%E5%8F%A3%E6%9C%8D%E5%8A%A1-%E4%BA%8C.html)
- [使用Express开发小说API接口服务1.0（三）](http://blog.langpz.com/%E4%BD%BF%E7%94%A8Express%E5%BC%80%E5%8F%91%E5%B0%8F%E8%AF%B4API%E6%8E%A5%E5%8F%A3%E6%9C%8D%E5%8A%A11-0%EF%BC%88%E4%B8%89%EF%BC%89.html)
- [使用apidoc文档神器，快速生成api文档](http://blog.langpz.com/%E4%BD%BF%E7%94%A8apidoc%E6%96%87%E6%A1%A3%E7%A5%9E%E5%99%A8%EF%BC%8C%E5%BF%AB%E9%80%9F%E7%94%9F%E6%88%90api%E6%96%87%E6%A1%A3.html)
- [部署小说api服务到腾讯云](http://blog.langpz.com/%E9%83%A8%E7%BD%B2%E5%B0%8F%E8%AF%B4api%E6%9C%8D%E5%8A%A1%E5%88%B0%E8%85%BE%E8%AE%AF%E4%BA%91.html)
