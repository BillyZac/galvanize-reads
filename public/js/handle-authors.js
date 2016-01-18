function handleAddAuthor() {
  $('.add-author').click(function() {
    console.log('clik!')
    var url = getAPIHost() + '/authors/'
    data = {
      first_name: $('.first_name').val()
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

$(function() {
  handleAddAuthor()
  handleViewAuthor()
  handleEditAuthor()
  handleDeleteAuthor()
})
