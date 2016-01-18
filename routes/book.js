var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function Books() {
  return knex('books')
}

var fetchBooks = require('../modules/fetch-books')

router.get('/', function(req, res) {
  Books().select().then(function(books) {
    console.log('This is the last book =============', books[length-1])
    // res.send('okay.')
    var length = books.length
    console.log(books[0].title)
    res.render('books', {
      title: "Galvanize Reads",
      books: books
    })
  })

})

router.post('/', function(req, res) {
  Books().insert({
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.cover_url
  }, 'id').then(function(result) {
    res.send('Created new book with id ' + result)
  })
})

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
        res.render('error', {
          message: 'No such book.',
          status: 404
        })
      }
    })
})

router.put('/:id', function (req, res){
  var id = req.params.id
  res.send('UPDATE item ' + id);
});

router.delete('/:id', function (req, res){
  var id = req.params.id
  res.send('DELETE item ' + id);
});

module.exports = router;
