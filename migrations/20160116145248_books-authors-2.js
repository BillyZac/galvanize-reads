exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', function(table) {
    table.increments()
    table.string('title')
    table.string('genre')
    table.text('description')
    table.text('cover_url')
  })
  .then(function() {
    return knex.schema.createTable('authors', function(table) {
      table.increments()
      table.integer('book_id').unsigned().references('id').inTable('books').onDelete('cascade')
      table.string('first_name')
      table.string('last_name')
      table.text('biography')
      table.text('portrait_url')
    })
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('authors')
  .then(function() {
    return knex.schema.dropTable('books')
  })
}
