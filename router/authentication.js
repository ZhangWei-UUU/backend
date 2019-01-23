var express = require('express');
const fs = require("fs");
const path = require('path');
var multer  = require('multer')
const jwt = require('jsonwebtoken');
const secret = "zhangwei1988";
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
var hash = require("hash.js");
const DB_CONFIG = require("../db");
const {queryUser} = require('./mongoClient');

const upload = multer({
    dest: "/Users/zhangwei/Desktop"
});

const handleError = (err, res) => {
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong!");
};
router.get('/userlist', async (req, res)=>{
    const result = await queryUser(null,"users");
    res.send(result)
})

router.post('/login', async (req, res)=> {
    const password = hash.sha256().update(req.body.password).digest("hex");
    let result = await queryUser({userName:req.body.userName,password},"users");
    delete result.password;
    const token = jwt.sign({
        name: req.body.userName
     }, secret, {
        expiresIn:  120 //秒到期时间
     });
    result.token = token;
    res.send({success:true,result})
});

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



router.post('/logout', function(req, res) {
    res.send({title:"/ws"});
});

router.post('/uploadUserHeader',upload.single('file'),(req,res)=>{
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "../images/image.png");
    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
        fs.rename(tempPath, targetPath, err => {
          if (err) return handleError(err, res);
          res
            .status(200)
            .end("File uploaded!");
        });
      }else {
        fs.unlink(tempPath, err => {
          if (err) return handleError(err, res);
          res
            .status(403)
            .end("Only .png files are allowed!");
        });
      }
})

module.exports = router;