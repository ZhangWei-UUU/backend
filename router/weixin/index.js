var express = require('express');
var router = express.Router();
var request = require("request-promise");
var { queryWeixinData } = require('../mongoClient');

const APPID = "wx2dde490fcd9e7a6f";
const SECRET = "bd9aed4b05137b7846fa61919472c02e";

router.get('/login', async (req, res)=> {
   let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${req.query.code}&grant_type=authorization_code`;
   let weixin_back = await request(url);
   let data = null;
   let result = JSON.parse(weixin_back);
   if(result.errmsg){
    success = false;
    data = {success:false,errmsg:result.errmsg}
   }else{
    data = await queryWeixinData(result.openid,'users');
   }
   res.send(data)
});


module.exports = router;