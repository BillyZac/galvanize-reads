var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', {
    title: 'Galvanize Reads',
    "musketeers": ["Athos", "Aramis", "Porthos", "D'Artagnan"]
   });
});

module.exports = router;
