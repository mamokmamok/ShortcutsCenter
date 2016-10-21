var utils = require('./utils');

// Get all books from the utils library
exports.getAllBooks = function(cb) {
  utils.getAllObject('books', cb)
}

exports.addBook = function(book, cb){
    utils.add('books', null ,book, cb);
}