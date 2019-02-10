var express = require('express');

var router = express.Router();
var { queryData,insertSingle,deleteSingle,updateSingle } = require('../mongoClient');

router.get('/:id', async (req, res)=> {
    if(req.params.id === "all"){
        const result = await queryData(null,"orders");
        res.send(result)
    }else{
        const result = await queryData(req.params.id,"orders");
        res.send(result)
    }  
});

router.post('/', async (req, res)=> {
    const object = req.body;
    const result = await insertSingle(object,"orders");
    res.send(result)
});

router.delete('/:id',async (req, res)=>  {
    const result = await deleteSingle(req.params.id,"orders");
    res.send(result)
});

router.post('/modify', async (req, res)=>  {
    const updateField = {payment:req.body.payment};
    const object = req.body;
    console.log(object,updateField)
    const result = await updateSingle(object,updateField,"orders");
    res.send(result)
});

module.exports = router;