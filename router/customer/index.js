var express = require('express');
var router = express.Router();
var { queryData,insertSingle,deleteSingle,updateSingle } = require('../mongoClient');

router.get('/:customerId', async (req, res)=> {
    if(req.params.customerId === "all"){
        const result = await queryData(null,"customers");
        res.send(result)
    }else{
        const result = await queryData(req.params.customerId,"customers");
        res.send(result)
    } 
});

router.post('/', async (req, res)=> {
    const object = req.body;
    const result = await insertSingle(object,"customers");
    res.send(result)
});

router.delete('/:id',async (req, res)=>  {
    const result = await deleteSingle(req.params.id,"customers");
    res.send(result)
});

router.post('/updateSingleCustomer', async (req, res)=>  {
    const result = await updateSingle(object,"customers");
    res.send(result)
});

module.exports = router;