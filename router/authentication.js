var express = require('express');
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
var hash = require("hash.js");
const DB_CONFIG = require("../db");
const {queryData} = require('./mongoClient');

router.get('/userlist', async (req, res)=>{
    const result = await queryData({},"users");
    res.send(result)
})

router.post('/registry', function(req, res) {
    MongoClient.connect(DB_CONFIG.url, function(err, client) {
        if(err){
          res.send(DB_CONFIG.dbError);
        }else{
          const db = client.db(DB_CONFIG.dbname);
          const hashPassword = hash.sha256().update(req.body.password).digest("hex");
          const collection = db.collection("users");
          const user = {userName:req.body.userName,password:hashPassword};
         
          collection.insertOne(user,(err)=>{
            if(err){
              res.send(DB_CONFIG.collectionError);
            }else{
              res.send({success:true,message:"注册成功"});
            }
          });
        }
      });
});

router.post('/login', function(req, res) {
    MongoClient.connect(DB_CONFIG.url, function(err, client) {
        if(err){
          res.send(DB_CONFIG.dbError);
        }else{
          const db = client.db(DB_CONFIG.dbname);
          const collection = db.collection("users");
          const password = hash.sha256().update(req.body.password).digest("hex");
          let {userName} = req.body;
          collection.findOne({userName,password},(err,data)=>{
            if(err){
              res.send(DB_CONFIG.collectionError);
            }else{
              if(data){
                req.session.loginUser = userName;
                res.send({success:true,message:`${data.userName}登录成功`});
              }else{
                errorRecorder(req,userName);
                res.send({success:false,message:"用户名或密码错误,输入错误超过三次以上账户将会被冻结1小时"});
              } 
            }
          });
        }
      }); 
});

router.post('/logout', function(req, res) {
    res.send({title:"/ws"});
});

module.exports = router;