var utils = require('./utils');

// Get all shortcuts from the utils library
exports.getAllShortcuts = function (software_id, cb) {
    utils.findByFiled('shortcuts', 'software_id', parseInt(software_id), cb);
}

exports.getAllCategories = function (software_id, cb) {
    utils.findByFiled('categories', 'software_id', parseInt(software_id), cb);
};

exports.addShortcut = function (shortcut, cb) {
    utils.add('shortcuts', null, shortcut, cb);
};


exports.deleteShortcut = function (id, cb) {
    utils.delete('shortcuts', id, cb);
};