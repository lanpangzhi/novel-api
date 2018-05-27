let express = require('express');
let request = require('request');
let common = require('../common/common.json'); // 引用公共文件
let router = express.Router();

/**
 * @api {get} /article 获取小说文章内容
 * @apiVersion 1.0.0
 * @apiName 小说文章内容
 * @apiGroup article
 *
 * @apiParam {String} link 小说link
 * @apiParam {Number} n  （可选）小说的页数，默认0
 * @apiParam {String} id （可选）小说id，如果不传就没有上一章和下一章
 *
 * @apiSuccess {Number} flag 是否获取到数据 1成功 0失败
 * @apiSuccess {String} id 小说id
 * @apiSuccess {JSON} chapter  文章内容
 * @apiSuccess {String} prev  上一章
 * @apiSuccess {String} next  下一章
 * @apiSuccess {String} msg  返回信息
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "flag": 1,
 *          "id": "577b6c81ccb7bf00499d036c",
 *          "chapter": {
 *              "title": "第一章 星空中的青铜巨棺",
 *              "body": "第一章星空中的青铜巨棺\n生命是世间最伟大的奇迹。\n四方上下曰宇。宇虽有实，而无定处可求。往古来今曰宙。宙虽有增长，不知其始之所至。\n浩瀚的宇宙，无垠的星空，许多科学家推测，地球可能是唯一的生命源地。\n人类其实很孤独。在苍茫的天宇中，虽然有亿万星辰，但是却很难寻到第二颗生命源星。\n遮天1\n不过人类从来没有放弃过探索，自上世纪以来已经『射』诸多太空探测器。\n旅行者二号是一艘无人外太空探测器，于一九七七年在美国肯尼迪航天中心『射』升空。\n它上面携带着一张主题为“向宇宙致意”的镀金唱片，里面包含一些流行音乐和用地球五十五种语言录制的问候辞，以冀有一天被可能存在的外星文明拦截和收到。\n从上世纪七十年代到现在，旅行者二号一直在孤独的旅行，在茫茫宇宙中它如一粒尘埃般渺小。\n同时代的外太空探测器，大多或已经生故障，或已经中断讯号联系，永远的消失在了枯寂的宇宙中。\n三十几年过去了，科技在不断展，人类已经研制出更加先进的外太空探测器，也许不久的将来对星空的探索会取得更进一步的展。\n但纵然如此，在相当长的时间内，新型外太空探测器依然无法追上旅行者二号的步伐。\n三十三年过去了，旅行者二号距离地球已经有一百四十亿公里。\n此时此刻，它已经达到第三宇宙度，轨道再也不能引导其飞返太阳系，成为了一艘星际太空船。\n黑暗与冰冷的宇宙中，星辰点点，犹如一颗颗晶莹的钻石镶嵌在黑幕上。\n旅行者二号太空探测器虽然正在极飞行，但是在幽冷与无垠的宇宙中却像是一只小小的蚁虫在黑暗的大地上缓缓爬行。\n三十多年过去后，就在今日这一刻，旅行者二号有了惊人的现！\n在枯寂的宇宙中，九具庞大的尸体静静的横在那里……\n二零一零年五月二十二日，美国宇航局接收到旅行者二号传送回的一组神秘的数据信息，经过艰难的破译与还原，他们看到了一幅不可思议的画面。\n在这一刻宇航局主监控室内所有人同时变『色』，最后如木雕泥塑般一动不动，他们震惊到了无以复加的地步！\n直至过了很久众人才回过神来，而后主监控室内一下子沸腾了。\n“上帝，我看到了什么？”\n“这怎么可能，无法相信！”\n…… 遮天1\n旅行者二号早已不受引导，只能单一的前进，传送回这组神秘的数据信息后，在那片漆黑的宇宙空间匆匆而过，驶向更加幽暗与深远的星域。\n由于那片星空太遥远，纵然有了重大现，捕捉到了一幅震撼『性』的画面，人类目前也无能为力。\n这组神秘信息并没有对外公布。而不久后，旅行者二号生了故障，中断了与地球的讯号传送。\n也许至此可以画上一个句号了，不过有时候事情往往会出乎人们的预料。\n无论是对星空的观测与探索，还是进行生命与物理的科学研究，空间站都具有得天独厚的优越环境。\n从一九七一年苏联先『射』载人空间站成功，到目前为止全世界已『射』了九个空间站。\n二零一零年六月十一日，此时此刻，绕地而行的国际空间站内，几名宇航员同时变了颜『色』，瞳孔急骤收缩。\n时至今日，神的存在，早已被否定。如果还有人继续信仰，那也只是因心灵空虚而寻找一份寄托而已。\n但是就在这一刻，几名宇航精英的思想受到了强烈的的冲击，他们看到了一幅不可思议的画面。\n在国际空间站外，冰冷与黑暗并存的宇宙中，九条庞然大物一动不动，仿佛亘古就已横在那里，让人感觉到无尽的苍凉与久远，那竟然是九具龙尸！\n与古代神话传说中的龙一般无二。\n每具龙尸都长达百米，犹如铁水浇铸而成，充满了震撼『性』的力感。\n九具龙尸皆是五爪黑龙，除却龙角晶莹剔透、紫光闪闪外，龙身通体呈黑『色』，乌光烁烁，鳞片在黑暗中闪烁着点点神秘的光华。\n龙，传说中的存在，与神并立，凌驾于自然规律之上。但是，科学展到现在，还有谁会相信龙真的存在？\n国际空间站内的几名宇航员，思想受到了强烈的冲击，眼前所见让他们感觉不可思议！\n枯寂的宇宙中，冰冷的龙尸似不可摧毁的钢铁长城，甚至能够感觉到尸身中所蕴含的恐怖力量。\n只是，它们已经失去了生气，永远的安息在了幽冷的宇宙空间中。\n“那是……”\n被深深震撼过后，几名宇航精英的瞳孔再次急骤收缩，他们看到了更为让人震惊的画面。\n九具龙尸都长达百米，在尾端皆绑缚着碗口粗的黑『色』铁索，连向九具龙尸身后那片黑暗的宇宙空间，在那里静静的悬着一口长达二十米的青铜棺椁。\n巨索千锤百炼，粗长而又坚固，点点乌光令它显得阴寒无比。\n青铜巨棺古朴无华，上面有一些模糊的古老图案，充满了岁月的沧桑感，也不知道在宇宙中漂浮多少年了。\n遮天1\n九龙拉棺！\n在这漆黑而又冰冷的宇宙中，九具龙尸与青铜巨棺被粗长的黑『色』铁索连在一起，显得极其震撼。\n在面对那不可思议的监控画面一阵失神后，几名宇航精英第一时间出了呼叫讯号。\n“呼叫地球……”\n※※※※※\n关于旅行者二号确实存在，上世纪七十年代在美国『射』升空，2o1o年四五月份与地球失去联系。\n辰东的新书开始上传，距离上本老书结束已经有了一段相当长的空白期，现在回来了，请各位书友多多支持下，感谢！\n现在需要登录起点帐号，点击才有效，不然点击不计算在内，请给位兄弟姐妹们辛苦下。\n新书需要点击、收藏、推荐票，请书友们支持下新书。\n晚上会接着更新的。"
 *          },
 *          "prev": "http://www.biquge.la/book/5210/3142585.html",
 *          "next": "http://www.biquge.la/book/5210/3142587.html",
 *          "msg": "OK"
 *      }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "flag": 0,
 *        "msg": "传入的页码过大"
 *     }
 */

router.get('/', function (req, res, next) {
    if (!req.query.link) {
        res.send(JSON.stringify({ "flag": 0, "msg": "请传入link..." }));
    }
    // req.query.link 编码转义
    let link = encodeURIComponent(req.query.link);
    request.get(`${common.CHAPTER}/chapter/${link}`, function (err, response, body) {
        if (err) {
            res.send(JSON.stringify({ "flag": 0, "msg": "请求出错了..." }));
        }

        // 解析返回的数据
        body = JSON.parse(body);

        if (body.ok){
            // 再次请求列表页获取上一页和下一页
            if(req.query.id){
                // req.query.id 编码转义
                let id = encodeURIComponent(req.query.id);
                let n = parseInt(req.query.n);
                if (isNaN(n)){
                    n = 0;
                }

                request.get(`${common.API}/atoc/${id}?view=chapters`, function (err, response, body2) {
                    if (err) {
                        res.send(JSON.stringify({ "flag": 0, "msg": "请求出错了..." }));
                    }

                    if (body2 == "wrong param"){
                        res.send(JSON.stringify({ "flag": 0, "msg": "传入错误的ID..." }));
                    }else{
                        // 解析返回的数据
                        body2 = JSON.parse(body2);
                        // 检查页码是否超过小说的章节数
                        if(n > body2.chapters.length - 1){
                            res.send(JSON.stringify({ "flag": 0, "msg": "传入的页码过大" }));
                        }else{
                            // 如果有上一页或者下一页就返回link否则返回false
                            let prev,next;
                            body2.chapters[n - 1] ? prev = body2.chapters[n - 1].link : prev = false;
                            body2.chapters[n + 1] ? next = body2.chapters[n + 1].link : next = false;

                            if (body2.chapters.length > 0) {
                                res.send(JSON.stringify({ "flag": 1,"id": id, "chapter": body.chapter, "prev": prev,"next": next, "msg": "OK" }));
                            }
                        }
                    }
                });
            }else{
                res.send(JSON.stringify({ "flag": 1, "chapter": body.chapter, "msg": "OK" }));
            }
            
        }else{
            res.send(JSON.stringify({ "flag": 0, "msg": "传入link有错误" }));
        }
    });
});

module.exports = router;