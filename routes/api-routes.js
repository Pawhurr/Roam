var db = require('../models');
var express = require('express');
var app = express();
var router = express.Router();
var exphbs = require('express-handlebars');
var moment = require('moment-timezone');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');

router.get('/city', function(req, res) {
    db.City.findAll({}).then(function(result) {
        res.render('index', result);
    });
});

router.post('/signup', function(req, res) {
    db.User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then(function(result) {
        res.json(result);
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

router.post('/north_america/:city', function(req, res) {
    var city = req.params.city;
    db.City.findAll({where: {city: city}}).then(function(result) {
        res.render('index', result);
    });
});

router.post('/europe/:city', function(req, res) {
    var city = req.params.city;
    db.City.findAll({where: {city: city}}).then(function(result) {
        res.json('index', result);
    });
});

router.post('/australia/:city', function(req, res) {
    var city = req.params.city;
    db.City.findAll({where:{city: city}}).then(function(result) {
        res.json('index', result);
    });
});

module.exports = router;