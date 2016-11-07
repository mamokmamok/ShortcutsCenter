var utils = require('./utils');

// Get all shortcuts from the utils library
exports.getAllShortcuts = function (softwareId, cb) {
    utils.findByFiled('shortcuts', 'softwareId', parseInt(softwareId), cb);
}

exports.getAllCategories = function (softwareId, cb) {
    utils.findByFiled('categories', 'softwareId', parseInt(softwareId), cb)
}

exports.addShortcut = function (shortcut, cb) {
    utils.add('shortcuts', null, shortcut, cb);
}


exports.deleteShortcut = function (id, cb) {
    utils.delete('shortcuts', id, cb);
}