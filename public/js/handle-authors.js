function handleAddAuthor() {
  $('.add-author').click(function() {
    console.log('clik!')
    var url = getAPIHost() + '/authors/'
    data = {
      first_name:   $('.first_name').val(),
      last_name:    $('.last_name').val(),
      biography:    $('.biography').val(),
      portrait_url: $('.portrait_url').val()
    }
    // console.log(data.first_name)
    $.ajax(url, {
      method: 'post',
      data: data
    })
  })
}

function handleDeleteAuthor() {
  $('.delete').click(function() {
    var authorId = $(this).data('id')
    console.log('the id: ' + authorId)
    $.ajax(getAPIHost() + '/authors/' + authorId, { method: 'delete' })
    .then(function() {
      window.location = '/authors'
    })
  })
}

function handleEditAuthor() {
  $('.save-edit').click(function() {
    var data = {
      title: $('.title').val(),
      genre: $('.genre').val(),
      description: $('.description').val(),
      cover_url: $('.cover-url').val()
    }
    if (formValid(data)) {
        var authorId = $('.author-id').data('id')
        console.log('This is the author id: ' + authorId)
        // console.log('This is the author title: ' + $('.title').val())

        // console.log('Saving author with this id: ' + authorId)
      //   console.log('Saving author with this data: \n' +
      //   'Title: ' + data.title + '\n' +
      //   'Description: ' + data.description + '\n' +
      //   'Genre: ' + data.genre + '\n' +
      //   'cover_url: ' + data.cover_url
      // )
      $.ajax(getAPIHost() + '/authors/' + authorId, {
        method: 'put',
        data: data
      })
      .then(function() {
        // window.location = '/authors'
        window.location = '/authors/' + authorId
      })
    } else {
      $('.message').text('Form cannot be blank.')
    }
  })
}

function formValid(data) {
  for (item in data) {
    console.log(data[item])
    if (data[item] === '') {
      return false
    }
  }
  return true
}


function handleViewAuthor() {
  $('.view-author').click(function() {
    var authorId = $(this).data('id')
    console.log('Clicked view author link. id: ' + authorId)
    console.log('URL for author view: ', getAPIHost() + '/authors/' + authorId)
    window.location = getAPIHost() + '/authors/' + authorId
  })
}

function handleFormValidation() {
  $('input').blur(function() {
    var message = []
    validateName(message)
    validateURL(message)
    displayMessage(message)
    console.log(message)
  })
}

function validateName(message) {
  var first_name = $('.first_name').val()
  var last_name = $('.last_name').val()
  if (
    first_name == null || first_name == '' ||
    last_name == null || last_name == ''
  ) {
    message.push('The name can\'t be blank.')
  }
  return message
}

function validateURL(message) {
  // If the url is not blank, it must be a valid url.
  var urlExpression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var urlRegex = new RegExp(urlExpression);
  var url = $('.portrait_url').val()
  console.log('url: ' + url)
  if ( !(url.match(urlRegex)) ) {
    message.push('Please use a valid url.')
  }
  return message
}

function displayMessage(message) {
  $('.message').empty()
  message.forEach(function(sentence) {
    var sentenceHTML = '<p>' + sentence + '</p>'
    $('.message').append(sentenceHTML)
  })
}

$(function() {
  handleAddAuthor()
  handleViewAuthor()
  handleEditAuthor()
  handleDeleteAuthor()
  handleFormValidation()
})
