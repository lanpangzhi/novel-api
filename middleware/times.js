const moment = require('moment')
/** 
 * 设置禁止访问的时间段
 * @param start [Number] 
 * @param end [Number] 
*/
function times(start, end) {
  return function(req, res, next) {
    const hour = moment().hour()
    if (hour >= start || hour < end) {
      return res.send(JSON.stringify({ "flag": 0, "msg": `快去睡觉吧，${start}点至${end}点无法访问` }));
    } else {
      next()
    }
  }
}

module.exports = times