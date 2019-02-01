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
    dest: "/tmp"
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
    let params = {
                    Bucket: 'test-1253763202',
                    Region: 'ap-shanghai',
                    Key: `/product/${userId}/${currentTime}.jpg`,
                    FilePath: tempPath
                }
    cos.sliceUploadFile(params, (err, data)=> {
        if(err){
            res.status(500).send({success:false,reason:err});
        }else{
            res.send({success:true,location:data.Location,Key:data.Key});
        }   
    });
});

router.delete('/deleteUploaded/*',(req,res)=>{
    let params = {
        Bucket: 'test-1253763202',
        Region: 'ap-shanghai',
        Key:req.params[0],
    }
    cos.deleteObject(params, (err, data)=> {
        if(err){
            res.status(500).send({success:false,reason:err});
        }else{
            res.send({success:true,location:data.Location});
        }   
    });    
})

module.exports = router;