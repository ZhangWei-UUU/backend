var express = require('express');
const fs = require("fs");
const path = require('path');
var multer  = require('multer')
const jwt = require('jsonwebtoken');
const secret = "zhangwei1988";
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const DB_CONFIG = require("../db");
const {insertSingle,queryUser} = require('./mongoClient');
const checkToken = require('./checkToken');
const upload = multer({
    dest: "/Users/zhangwei/Desktop"
});

const handleError = (err, res) => {
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong!");
};

router.get('/userlist', checkToken,async (req, res)=>{
   
    const result = await queryUser(null,"users");
    res.send(result)
})

router.post('/login', async (req, res)=> {
    const object = req.body;
    let result = await queryUser(object,"users");
    if(result){
        delete result.password;
        const token = jwt.sign({
            name: req.body.userName
         }, secret, {
            expiresIn:  60*60*24 //秒到期时间
         });
        result.token = token;
        res.cookie('jwt', token);
        res.send({success:true,result})
    }else{
        res.send({success:false,result:"密码错误或用户名不存在"})
    }
   
});

router.post('/registry', async (req, res)=>{
    const object = req.body;
    const result = await insertSingle(object,"users");
    res.send(result)
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