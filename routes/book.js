var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function Books() {
  return knex('books')
}

var fetchBooks = require('../modules/fetch-books')

router.get('/', function(req, res) {
  var host = process.env.HOST || 'http://localhost:5000'
  var links = {
    authors: host + '/authors',
    books:   host + '/books'
  }
  Books().select().then(function(books) {
    var length = books.length
    console.log('The books array item 0: ', books[0])
    res.render('books', {
      title: "Galvanize Reads",
      books: books,
      links: links
    })
  })

})

router.post('/', function(req, res) {
  newBook = {
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.cover_url
  }
  Books().insert(newBook, 'id').then(function(result) {
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
  var data = req.body
  var id = req.params.id

  if (formValid(data)) {
    Books().where('id', id).update({
      title: data.title,
      genre: data.genre,
      description: data.description,
      cover_url: data.cover_url
    }).then(function(result){
      res.send('UPDATED item ' + id);
    })
  } else {
    res.render('error', {
        message: 'Form inputs cannot be blank.',
        status: 400
    })
  }
})

function formValid(data) {
  for (item in data) {
    console.log(data[item])
    if (data[item] === '') {
      return false
    }
  }
  return true
}

router.delete('/:id', function (req, res){
  var id = req.params.id
  Books().where('id', id).del().then(function(result) {
    res.send('DELETED. The result: ' + result)
  })
})

module.exports = router;
