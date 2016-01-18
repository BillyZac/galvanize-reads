var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function Authors() {
  return knex('authors')
}



router.get('/', function(req, res) {
  Authors().select().then(function(authors) {
    var length = authors.length
    console.log('The authors array item 0: ', authors[0])
    res.render('authors', {
      title: "Galvanize Reads",
      authors: authors
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
  Authors().insert(newBook, 'id').then(function(result) {
    res.send('Created new author with id ' + result)
  })
})

router.get('/:id', function(req, res) {
  var id = req.params.id
    Authors().select().where('id', id).then(function(results) {
      var author = results[0]
      res.render('author', {
        title: 'Galvanize Reads',
        author: author
      })
    })
})

router.put('/:id', function (req, res){
  var data = req.body
  var id = req.params.id

  if (formValid(data)) {
    Authors().where('id', id).update({
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
  Authors().where('id', id).del().then(function(result) {
    res.send('DELETED. The result: ' + result)
  })
})

module.exports = router;
