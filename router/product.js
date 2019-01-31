var express = require('express');
var router = express.Router();
var COS = require('cos-nodejs-sdk-v5');
var multer  = require('multer')
var { insertSingle,queryData,deleteSingle } = require('./mongoClient');

var cos = new COS({
    SecretId: 'AKIDpjXtCOajksRtslpaO7CADOdibJtIjmFX',
    SecretKey: 'fL8lCX7jHmJkDYjjY5TGxUrZU3gnllly'
});

const handleError = (err,res) => {
    res.status(500).send({success:false,reason:err});
}

const upload = multer({
    dest: "./images"
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
    res.send(result)
});

router.post('/upload',upload.single('file'),(req,res)=>{
    const tempPath = req.file.path;
    var currentTime = new Date().getTime();
    let {userId} = req.query;
    cos.sliceUploadFile({
        Bucket: 'test-1253763202',
        Region: 'ap-shanghai',
        Key: `/product/${userId}/${currentTime}.jpg`,
        FilePath: tempPath
        }, (err, data)=> {
       
        if(err){
            res.status(403).send({success:false,reason:err});
        }else{
            console.log(data);
            res.send({success:true,location:data.Location});
        }   
    });
})

module.exports = router;