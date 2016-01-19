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
    res.render('authors', {
      title: "Galvanize Reads",
      authors: authors,
      links: links
    })
  })

})

router.post('/', function(req, res) {
  var author = req.body
  console.log('Incoming author data on post request: ' + author.first_name)

  if (authorDataValid(author)) {
    //create the new record
    Authors().insert({
      first_name: author.first_name,
      last_name:  author.last_name,
      biography: author.biography,
      portrait_url: author.portrait_url
    }, 'id').then(function(id) {
      res.send('Created a new author with id ' + id)
    })
  } else {
    // respond with error
    res.render('error', {
        message: 'Data is not valid. Name fields cannot be blank. The URL can be blank, but if a url is submitted it must be a proper url.',
        status: 400
    })
  }
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

// I know we have two form validation functions here.
// At some point, I need to combine the two, or somehow clean it up.
function formValid(data) {
  for (item in data) {
    console.log(data[item])
    if (data[item] === '') {
      return false
    }
  }
  return true
}

function authorDataValid(author) {
  return validateURL(author.portrait_url)

  function validateURL(url) {
    // If the url is not blank, it must be a valid url.
    var urlExpression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    var urlRegex = new RegExp(urlExpression)
    if (url != '') {
      if ( !(url.match(urlRegex)) ) {
        console.log('The URL received is: ' + url)
        console.log('URL is not valid.')
        return false
      }
    }
    return true
  }
}

router.delete('/:id', function (req, res){
  var id = req.params.id
  Authors().where('id', id).del().then(function(result) {
    res.send('DELETED. The result: ' + result)
  })
})

module.exports = router;
