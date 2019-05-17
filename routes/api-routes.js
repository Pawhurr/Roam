var db = require('../models');
var express = require('express');
var app = express();
var router = express.Router();
var exphbs = require('express-handlebars');
var moment = require('moment-timezone');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var { ensureAuthenticated} = require('../config/auth');
var extAPI = require('./allAPI')

app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');

//================================================================//


router.get('/', ensureAuthenticated, function(req, res) {
    res.render('index');
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

router.get('/australia', function(req, res) {
    db.Country.findAll({where: {continent: 'Australia'}}).then(function(result) {
        var hbs_obj = {
            result: result
        };
        res.render('countries', hbs_obj);
    });
});

router.get('/asia', function(req, res) {
    db.Country.findAll({where: {continent: 'Asia'}}).then(function(result) {
        var hbs_obj = {
            result: result
        };
        res.render('countries', hbs_obj);
    });
});

router.get('/europe', function(req, res) {
    db.Country.findAll({where: {continent: 'Europe'}}).then(function(result) {
        var hbs_obj = {
            result: result
        };
        res.render('countries', hbs_obj);
    });
});

router.get('/africa', function(req, res) {
    db.Country.findAll({where: {continent: 'Africa'}}).then(function(result) {
        var hbs_obj = {
            result: result
        };
        res.render('countries', hbs_obj);
    });
});

router.get('/northAmerica', function(req, res) {
    db.Country.findAll({where: {continent: 'North America'}}).then(function(result) {
        var hbs_obj = {
            result: result
        };
        console.log(hbs_obj.result[0].dataValues.continent)

        res.render('countries', hbs_obj);
    });
});

router.get('/southAmerica', function(req, res) {
    db.Country.findAll({where: {continent: 'South America'}}).then(function(result) {
        var hbs_obj = {
            result: result
        };
        res.render('countries', hbs_obj);
    });
});

//=============================================================//

// router.post('/countries', ensureAuthenticated, function(req, hbs) {
//     db.Country.findAll({where:{continent: req.body.continent}}).then(function(result) {
//         console.log(result);
//         var hbs_obj = {
//             result: result
//         };
//         hbs.render('countries', hbs_obj);
//     });
// });

router.get('/admin', ensureAuthenticated, function(req, res) {
    db.Country.findAll({}).then(function(result) {
        var continents = [];
        var cont_obj = [];
        var ContObj = function(continent) {
            this.continent = continent
        };
        for (var i in result) {
            continents.push(result[i].dataValues.continent);
        }
        for (var j in continents) {
            if (j == 0) {
                console.log('Added new obj due to undefined');
                cont_obj[cont_obj.length] = new ContObj(continents[j]);
                continue;
            }
            var cont_index = continents.indexOf(cont_obj[cont_obj.length - 1].continent);
            if (cont_index === -1) {
                cont_obj[cont_obj.length] = new ContObj(continents[j]);
            }
        }
        console.log(cont_obj);
        
        hbs_obj = {
            continents: cont_obj,
            result: result
        };
        res.render('admin', hbs_obj);
    });
});

router.post('/country-select', ensureAuthenticated, function(req, res) {
    db.Country.findOne({where:{country: req.body.country}}).then(function(result) {
        console.log(result);
        res.json(result);
    });
});

router.post('/build-country', function(req, res) {
    db.Country.update({where:{country: req.body.country},
        bty: req.body.bty,

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

router.post('/someRoute', function(req, res) {
    extAPI(req.body.country, function(info){
        res.send(info)
    })
})

module.exports = router;