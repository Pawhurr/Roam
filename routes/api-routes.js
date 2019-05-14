var db = require('../models');
var express = require('express');
var app = express();
var router = express.Router();
var exphbs = require('express-handlebars');
var moment = require('moment-timezone');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var { ensureAuthenticated} = require('../config/auth');

app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');

//================================================================//

router.get('/', ensureAuthenticated, function(req, res) {
    res.render('home');
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/signup', function(req, res) {
    res.render('signup');
});

router.post('/signup', function(req, res) {
    db.User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then(function(result) {
        res.render('login');
    });
});

//=============================================================//

router.get('/city', ensureAuthenticated, function(req, res) {
    res.render('index');
});

router.get('/admin', ensureAuthenticated, function(req, res) {
    console.log(req.session);
    res.render('admin');
});

router.post('/create', ensureAuthenticated, function(req, res) {
    db.City.create({
        city: req.body.city,
        timezone: req.body.tz
    }).then(function(result) {
        console.log(result);
        res.render('index', result);
    });
});

router.post('/clock', function(req, res) {
    var tz = req.body.tz;
    console.log(tz);
    clock = {
        time: moment().tz(tz).format('MMMM Do YYYY, h:mm a')
    };
    res.json(clock);
});

module.exports = router;