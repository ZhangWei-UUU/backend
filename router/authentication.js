var express = require('express');
const fs = require("fs");
const path = require('path');
var multer  = require('multer')
const jwt = require('jsonwebtoken');
const secret = "zhangwei1988";
var router = express.Router();
const {insertSingle,queryUser} = require('./mongoClient');
const checkToken = require('./checkToken');
const upload = multer({
    dest: "/Users/zhangwei"
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
            expiresIn:  1000*60*10 //100分钟到期时间
         });
        res.cookie('jwt',token,{maxAge:1000*60*10});
        res.cookie('userId',result._id);
        res.cookie('userName',result.userName);
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


router.get('/logout', function(req, res) {
    console.log(req.cookies)
    res.clearCookie('jwt');
    res.clearCookie('userId');
    res.clearCookie('userName');
    res.send({success:true});
});

router.post('/uploadUserHeader',upload.single('file'),(req,res)=>{
    const tempPath = req.file.path;
    const targetPath = path.join(process.env.FILE_STORE, `./${req.cookies.userId}header.jpg`);
    if (path.extname(req.file.originalname).toLowerCase() === ".jpg") {
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
            .end("Only .jpg files are allowed!");
        });
      }
})

module.exports = router;