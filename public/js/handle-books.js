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
    var bookId = $('.book-id').data('id')
    console.log('This is the book id: ' + bookId)
    // console.log('This is the book title: ' + $('.title').val())
    var data = {
      title: $('.title').val()
    }

    // console.log('Saving book with this id: ' + bookId)
    console.log('Saving book with this data.title: ' + data.title)
    $.ajax(getAPIHost() + '/books/' + bookId, {
      method: 'put',
      data: data
     })
    .then(function() {
      // window.location = '/books'
      window.location = '/books/' + bookId
    })
  })
}

$(function() {
  handleDeleteBook()
  handleEditBook()
})
