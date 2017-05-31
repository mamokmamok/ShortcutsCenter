var MongoClient = require('mongodb').MongoClient;
var assert = require('assert'); // Understanding why we useing the assert
//
//              Development
//      TODO : move to configruation
//var url = "mongodb://guest:ShortcutsCenterAdmin@52.38.32.116:27017/";
var url = "mongodb://guest:ShortcutsCenterAdmin@localhost:27017/";
var dbName = "shortcuts";
var dbManager;

if (!dbManager) {
    MongoClient.connect(url + dbName, function (err, db) {
        if (!err) {
            dbManager = db;
            console.log("Connected to DB success [ " + url + dbName + " ]");
        }
        else {
            console.error("Error connection DB: " + err)
        }
    });
}
else {
}

exports.getAllObject = function (type, cb) {
    var result = [];
    console.log("Start getAllObjectType(" + type + ")");
    var cursor = dbManager.collection(type).find();
    cursor.each(function (err, doc) {
        assert.equal(err, null);
        i = result.length;
        if (doc != null) {
            i++;

            // Remove at this point the ObjectId from mongo
            doc._id = "";

            result.push(doc);
        } else {
            console.log("Found : " + i + " " + type)
            cb(result);
        }
    });
}

exports.findByFiled = function (type, filedname, value, cb) {
    var query = {};
    query[filedname] = value;
    console.log("inside function findByFiled() [utils.js] type : " + type + "- {" + filedname + ":" + value + "}");
    dbManager.collection(type).find(query).toArray(function (err, docs) {
        docs.forEach(function(doc) { delete doc._id });
        cb(docs);
    });
}

exports.findById = function (id, type, cb) {
    console.log("inside function findById() [utils.js]");
    process.nextTick(function () {
        var cursor = dbManager.collection(type).find({"_id": id});
        return cb(null, null);
    });
}


exports.add = function (type, id, doc, cb) {
    process.nextTick(function () {
        dbManager.collection(type).insertOne(doc, function (newDoc) {
            console.log("insert doc" + doc + "\n from type:" + type);
            cb(null);
        });
    })
};

exports.delete = function (type, id, cb) {
    process.nextTick(function () {
        if (!id) {
            throw "Cant delete for null object"
        }
        dbManager.collection(type).deleteOne({"_id": id}, function () {
            console.log("Deleted doc id :" + id + " -  from type:" + type);
            cb(null);
        });
    })
};

exports.toMap = function (arr){
    var mapResult= arr.reduce(function(map, obj) {
        map[obj.id] = obj;
        return map;
    }, {});
    return mapResult;
};

