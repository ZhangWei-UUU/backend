var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send({title:"/ws"});
});

router.get('/about', function(req, res) {
  res.send({title:"/ws/aboute"});
});

module.exports = router;