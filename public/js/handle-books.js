var baseUrl = 'http://localhost:5000/'

function handleDeleteBook() {
  $('.delete').click(function() {
    var bookId = $(this).data('id')
    console.log('the id: ' + bookId)
    $.ajax(baseUrl + 'books/' + bookId, { method: 'delete' })
    .then(function() {
      window.location = '/books'
    })
  })
}

$(function() {
  handleDeleteBook()
})
