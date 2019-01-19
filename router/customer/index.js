var express = require('express');
var router = express.Router();
var { queryData,insertSingle,deleteSingle,updateSingle } = require('../mongoClient');

router.get('/customer/:customerId', async (req, res)=> {
    if(req.params.orderId === "all"){
        const result = await queryData({},"customers");
        res.send(result)
    }else{
        const result = await queryData({id:orderId},"customers");
        res.send(result)
    }
    
});

router.post('/insertSingleCustomer', async (req, res)=> {
    const object = req.body;
    const result = await insertSingle(object,"customers");
    res.send(result)
});

router.delete('/deleteSingleCustomer/:id',async (req, res)=>  {
    const result = await deleteSingle(req.params.id,"customers");
    res.send(result)
});

router.post('/updateSingleCustomer', async (req, res)=>  {
    const result = await updateSingle(object,"customers");
    res.send(result)
});

module.exports = router;