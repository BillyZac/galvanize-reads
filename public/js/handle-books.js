function getAPIHost() {
  if(window.location.hostname == 'localhost') {
    return 'http://localhost:5000';
  } else {
    return 'https://galvanize-reads.herokuapp.com';
  }
}

function handleDeleteBook() {
  $('.delete').click(function() {
    var bookId = $(this).data('id')
    console.log('the id: ' + bookId)
    $.ajax(getAPIHost() + '/books/' + bookId, { method: 'delete' })
    .then(function() {
      window.location = '/books'
    })
  })
}

function handleEditBook() {
  $('.save-edit').click(function() {
    var data = {
      title: $('.title').val(),
      genre: $('.genre').val(),
      description: $('.description').val(),
      cover_url: $('.cover-url').val()
    }
    if (formValid(data)) {
        var bookId = $('.book-id').data('id')
        console.log('This is the book id: ' + bookId)
        // console.log('This is the book title: ' + $('.title').val())

        // console.log('Saving book with this id: ' + bookId)
      //   console.log('Saving book with this data: \n' +
      //   'Title: ' + data.title + '\n' +
      //   'Description: ' + data.description + '\n' +
      //   'Genre: ' + data.genre + '\n' +
      //   'cover_url: ' + data.cover_url
      // )
      $.ajax(getAPIHost() + '/books/' + bookId, {
        method: 'put',
        data: data
      })
      .then(function() {
        // window.location = '/books'
        window.location = '/books/' + bookId
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

function handleViewLink() {
  $('.view-link').click(function() {
    console.log('Clicked view link.')
    var bookId = $(this).data('id')
    window.location = getAPIHost() + '/books/' + bookId
  })
}

$(function() {
  handleDeleteBook()
  handleEditBook()
  handleViewLink()
})
