var express = require('express');
var router = express.Router();
const fs = require("fs");
const path = require('path');
var multer  = require('multer')
var { insertSingle,queryData,deleteSingle } = require('./mongoClient');

const upload = multer({
    dest: "/Users/zhangwei"
});

router.post('/', async (req, res)=> {
    const back = await insertSingle(req.body,"products");
    if(back.ok && back.ok === 1 && back.n){
        res.send({success:true,result:back.n})
    }else{
        res.send(back)
    }
});

router.get('/:id', async (req, res)=> {
    if(req.params.id === "all"){
        const result = await queryData(null,"products");
        res.send(result)
    }else{
        const result = await queryData({id:id},"products");
        res.send(result)
    }  
});

router.delete('/:id',async (req, res)=>  {
    const result = await deleteSingle(req.params.id,"products");
    console.log(result)
    res.send(result)
});

router.post('/upload',upload.single('file'),(req,res)=>{
    const tempPath = req.file.path;
    const targetPath = path.join(process.env.FILE_STORE, `./${req.params.userId}header.jpg`);
    if (path.extname(req.file.originalname).toLowerCase() === ".jpg") {
        fs.rename(tempPath, targetPath, err => {
          if (err) return handleError(err, res);
          res
            .status(200)
            .send({success:true,location:targetPath});
        });
      }else {
        fs.unlink(tempPath, err => {
          if (err) return handleError(err, res);
          res
            .status(403)
            .send({success:false,reason:"上传失败"});
        });
      }
})

module.exports = router;