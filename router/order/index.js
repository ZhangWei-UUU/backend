var express = require('express');
const jwt = require('jsonwebtoken');
const secret = "zhangwei1988";

var router = express.Router();
var { queryData,insertSingle,deleteSingle,updateSingle } = require('../mongoClient');

router.get('/orders/:orderId', async (req, res)=> {
    if(req.params.orderId === "all"){
        console.log("TOKEN",req.cookies.jwt)
        try{
            var decoded = jwt.verify(req.cookies.jwt, secret);
            console.log(decoded)
            const result = await queryData(null,"orders");
            res.send(result)
        }catch(e){
            console.log("token 失效")
            res.send({result:"过期"})
        }  
    }else{
        const result = await queryData({id:orderId},"orders");
        res.send(result)
    }  
});

router.post('/insertSingleOrder', async (req, res)=> {
    const object = req.body;
    const result = await insertSingle(object,"orders");
    res.send(result)
});

router.delete('/deleteSingleOrder/:id',async (req, res)=>  {
    const result = await deleteSingle(req.params.id,"orders");
    res.send(result)
});

router.post('/updateSingleOrder', async (req, res)=>  {
    const result = await updateSingle(object,"orders");
    res.send(result)
});

module.exports = router;