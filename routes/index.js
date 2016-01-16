var express = require('express');
var router = express.Router();
var fetchBooks = require('../modules/fetch-books')

/* GET home page. */

router.get('/', function(req, res) {
  // Find the books in the data store
  var books = fetchBooks

  res.render('index', {
    title: 'Galvanize Reads',
    "books": books
   });
});

module.exports = router;
