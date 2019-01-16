var express = require('express');
var router = express.Router();
const {queryData,insertSingle,deleteSingle,updateSingle} = require('../mongoClient');

router.get('/orders', function(req, res) {
    const result = await queryData({},"orders");
    res.send(result)
});


router.post('/insertSingleOrder', function(req, res) {
    const result = await insertSingle(object,"orders");
    res.send(result)
});

router.delete('/deleteSingleOrder/:id', function(req, res) {
    const result = await deleteSingle(req.params.id,"orders");
    res.send(result)
});

router.post('/updateSingleOrder', function(req, res) {
    const result = await updateSingle(object,"orders");
    res.send(result)
});

module.exports = router;