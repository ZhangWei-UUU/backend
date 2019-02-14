var express = require('express');
var router = express.Router();
var request = require("request");
var { queryData,insertSingle,deleteSingle,updateSingle } = require('../mongoClient');

const APPID = "wx2dde490fcd9e7a6f";
const SECRET = "bd9aed4b05137b7846fa61919472c02e"
router.post('/login', async (req, res)=> {
   let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=JSCODE&grant_type=a${req.body.code}`;
   request(url).on("error",(err)=>{
    res.statusCode = "500";
    res.statusMessage = err;
    res.end();
  }).pipe(res);
});


module.exports = router;