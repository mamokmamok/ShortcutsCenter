var utils = require('./utils');
var users = [];

console.log("Start user.js")

var getAllUsers = function() {
  console.log("inside function getAllUsers()");
  utils.getAllObject('user', function (result) {
    console.log(result)
    uses = result;
  });
};

exports.findById = function(id, cb) {
  console.log("inside function findById(" + id + ") [user.js]");
  process.nextTick(function() {
    var idx = id - 1;
    if (users[idx]) {
      cb(null, users[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function(username, cb) {
  console.log("inside function findByUsername() [user.js]");
  utils.findByFiled('user','username', username, function(err, users) {
    if (users.length !== 1) {
      cb("User not found", null);
    }
    else{
      cb(null, users[0]);
    }
  });
}
