var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  var host = process.env.HOST || 'http://localhost:5000'
  var links = {
    authors: host + '/authors',
    books:   host + '/books'
  }
  res.render('index', {
    title: 'Galvanize Reads',
    links: links
   });
});

module.exports = router;
