var utils = require('./utils');

// Get all software from the utils library
exports.getAllSoftwares = function(cb) {
  utils.getAllObject('softwares', cb)
}