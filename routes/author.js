var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function Authors() {
  return knex('authors')
}



router.get('/', function(req, res) {
  var host = process.env.HOST || 'http://localhost:5000'
  var links = {
    authors: host + '/authors',
    books:   host + '/books'
  }
  Authors().select().then(function(authors) {
    var length = authors.length
    console.log('The authors array item 0: ', authors[0])
    res.render('authors', {
      title: "Galvanize Reads",
      authors: authors,
      links: links
    })
  })

})

router.post('/', function(req, res) {
  var data = req.body
  console.log(data)

  Authors().insert({
    first_name: data.first_name,
    last_name:  data.last_name,
    biography: data.biography,
    portrait_url: data.portrait_url
  })

  // Authors().insert({
  //   first_name:   'foo',
  //   last_name:    'foo',
  //   biography:    'foo',
  //   portrait_url: 'foo'
  // })

  .then(function() {
    res.send('okie doke.')
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
