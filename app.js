let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let fs = require('fs');
let FileStreamRotator = require('file-stream-rotator'); // 日志按时间分割模块


let indexRouter = require('./routes/index');
let searchRouter = require('./routes/search');
let sourceRouter = require('./routes/source');
let chapterRouter = require('./routes/chapter');
let articleRouter = require('./routes/article');
let rankingRouter = require('./routes/ranking');

let app = express();
let logDir = path.join(__dirname, 'log');

// 检查是否存在logDir这个目录没有则创建
fs.existsSync(logDir) || fs.mkdirSync(logDir);

// 日志按时间分割流
let accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDir, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
});

// 日志中间件
app.use(logger('combined', { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// cors跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next()
});

// 路由中间件
// 首页
app.use('/index', indexRouter);
// 搜索
app.use('/search', searchRouter);
// 小说源
app.use('/source', sourceRouter);
// 小说文章列表
app.use('/chapter', chapterRouter);
// 小说文章内容
app.use('/article', articleRouter);
// 排行榜
app.use('/ranking', rankingRouter);

module.exports = app;
