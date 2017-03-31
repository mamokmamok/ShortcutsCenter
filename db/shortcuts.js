var utils = require('./utils');

// Get all shortcuts from the utils library
exports.getAllShortcuts = function (softwareId, cb) {
    utils.findByFiled('shortcuts', 'software_id', parseInt(softwareId), cb);
}

exports.getAllCategories = function (softwareId, cb) {
    utils.findByFiled('categories', 'software_id', parseInt(softwareId), cb)
}

exports.addShortcut = function (shortcut, cb) {
    utils.add('shortcuts', null, shortcut, cb);
}


exports.deleteShortcut = function (id, cb) {
    utils.delete('shortcuts', id, cb);
}