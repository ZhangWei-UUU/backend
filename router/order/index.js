var express = require('express');

var router = express.Router();
var { queryData,insertSingle,deleteSingle,updateSingle } = require('../mongoClient');

router.get('/:id', async (req, res)=> {
    if(req.params.id === "all"){
        const result = await queryData(null,"orders");
        res.send(result)
    }else{
        const result = await queryData({id:id},"orders");
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