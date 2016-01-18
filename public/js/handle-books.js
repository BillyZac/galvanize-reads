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
  console.log('Ready to save edits.')
  $('.save-edit').click(function() {
    console.log('Saving the edit. Not really.')
  })
}

$(function() {
  handleDeleteBook()
  handleEditBook()
})
