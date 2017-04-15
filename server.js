var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db/index');
var path = require('path');

//var log = require('consolelog');

// init DB
console.log("Server Starting running : server.js");

// Configure the local strategy for use by Passport.
passport.use(new Strategy(
    function (username, password, cb) {
        //console.log("Passport findByUsername() - { username : " + username + "}");
        db.users.findByUsername(username, function (err, user) {
            if (err) {
                //console.log("Passport findByUsername() - Error");
                return cb(err);
            }
            if (!user) {
                //console.log("Passport findByUsername() - User is null");
                return cb(null, false);
            }
            if (user.password != password) {
                //console.log("Passport findByUsername() - Password wrong");
                return cb(null, false);
            }
            return cb(null, user);
        });
    }));


// Configure Passport authenticated session persistence.
passport.serializeUser(function (user, cb) {
    console.log("Passport serializeUser()")
    cb(null, user.username);
});

passport.deserializeUser(function (id, cb) {
    console.log("Passport deserializeUser()")
    db.users.findByUsername(id, function (err, user) {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    });
});

// Create a new Express application.
var app = express();

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
//app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('express-session')({secret: 'keyboard cat', resave: false, saveUninitialized: false}));

// Add the public folder of the views as static express files.
app.use(express.static(path.join(__dirname, 'public'), {redirect: false}));

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

// Define routes:

// Send index html file to the client
app.get('/',
    function (req, res) {
        res.sendfile('public/index.html');
    });

//===================================
//              Login Methods
//===================================

app.get('/login',
    function (req, res) {
        console.log("[GET] /login");
        res.sendfile('public/login/login.html');
    });

app.get('/logout',
    function (req, res) {
        console.log("[GET] /logout");
        req.logout();
        res.redirect('/');
    });


app.post('/login',
    passport.authenticate('local', {failureRedirect: '/login', successRedirect: '/admin'}),
    function (req, res) {
        console.log("[POST] /login");
        res.redirect('/');
    });

app.get('/admin',
    // Don't delete
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        console.log("[GET] /admin");
        db.shortucts.getAllShortcuts(1, function (shortcuts) {
            //res.redirect('/admin');
            //res.render('shortcuts', {shortcuts: shortcuts});
            res.send({shortcuts: shortcuts});
        })
    });

//===================================
//              Data Methods
//===================================
// TODO: need to add before eatch request paramether some open source validaitor library

app.get('/softwares',
    function (req, res) {
        db.softwares.getAllSoftwares(function (softwares) {
            res.send({softwares: softwares});
        })
    });

app.get('/softwares/:software_id/categories',
    function (req, res) {
        db.shortucts.getAllCategories(req.params.software_id, function (categories) {
            res.send({categories: categories});
        })
    });

app.get('/softwares/:software_id/shortcuts',
    // Don't delete
    //require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        db.shortucts.getAllShortcuts(req.params.software_id, function (shortcuts) {
            res.send({shortcuts: shortcuts});
        })
    });

// need to fix
app.delete('/shortcuts',
    function (req, res) {
        var id = req.body.id;
        db.shortucts.deleteShortcut(id, function (err) {
            if (err) console.log("error");
        });
        res.redirect('/home');
    });

app.post('/shortcuts',
    function (req, res) {
        var shortcutKeys = req.body.shortcutKeys;
        var description = req.body.description;
        var category = req.body.category;
        db.shortucts.addShortcut({
            "shortcutKeys": shortcutKeys,
            "description": description,
            "category": category
        }, function (err) {
            if (err) console.log("error");
        })
        res.redirect('/admin');
    });

app.listen(3000);
