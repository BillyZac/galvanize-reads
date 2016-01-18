var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function Books() {
  return knex('books')
}

var fetchBooks = require('../modules/fetch-books')

router.get('/', function(req, res) {
  Books().select().then(function(books) {
    console.log('This is the first book =============', books[0])
    // res.send('okay.')
    var length = books.length
    console.log(books[0].title)
    res.render('books', {
      title: "Galvanize Reads",
      books: books
    })
  })

})

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

    Books().select().where('id', id).then(function(results) {
      var book = results[0]
      if (book) {
        res.render('book', {
          title: "Galvanize Reads",
          book: book
        })
      } else {
        res.send('No such book.');
      }
    })
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
