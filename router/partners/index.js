var express = require('express');
var router = express.Router();
var { queryData,insertSingle,deleteSingle,updateSingle } = require('../mongoClient');

router.get('/:id', async (req, res)=> {
    if(req.params.id === "all"){
        const result = await queryData(null,"partners");
        res.send(result)
    }else{
        const result = await queryData(req.params.id,"partners");
        res.send(result)
    } 
});

router.post('/', async (req, res)=> {
    const object = req.body;
    const result = await insertSingle(object,"partners");
    res.send(result)
});

router.delete('/:id',async (req, res)=>  {
    const result = await deleteSingle(req.params.id,"partners");
    res.send(result)
});

router.post('/updateSingleCustomer', async (req, res)=>  {
    const result = await updateSingle(object,"partners");
    res.send(result)
});

module.exports = router;