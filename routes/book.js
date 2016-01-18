var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function Books() {
  return knex('books')
}

var fetchBooks = require('../modules/fetch-books')

router.get('/', function(req, res) {
  Books().select().then(function(books) {
    var length = books.length
    console.log(books[0].title)
    res.render('books', {
      title: "Galvanize Reads",
      books: books
    })
  })
});

router.post('/new', function(req, res) {
  var data = req.body
  var response = ''
  for (item in data) {
    response += item,
    response += ': '
    response += data[item]
    response += ', '
  }
  console.log(data)
  res.send('CREATE a new item with this data: ' + response);
});

router.get('/:id', function(req, res) {
    var id = req.params.id
    res.send('READ item ' + id);
});

router.put('/:id', function (req, res){
  var id = req.params.id
  res.send('UPDATE item ' + id);
});

router.delete('/:id', function (req, res){
  var id = req.params.id
  res.send('DELETE item ' + id);
});

module.exports = router;
