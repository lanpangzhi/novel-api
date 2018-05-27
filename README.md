# novel-api
一个小说接口API服务

1.0版本:

技术栈使用express-generator、express、request、morgan、file-stream-rotator。接口用追书神器API。

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
http://localhost:3000
```