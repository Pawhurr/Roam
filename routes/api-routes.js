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
    res.render('index', {name: req.user.name});
});

router.get('/about', ensureAuthenticated, function(req, res) {
    hbs_obj = {
        name: req.user.dataValues.username,
        isSuperUser: req.user.dataValues.isSuperUser
    };
    res.render('about', hbs_obj);
});

router.get('/portfolio', ensureAuthenticated, function(req, res) {
    hbs_obj = {
        name: req.user.dataValues.username,
        isSuperUser: req.user.dataValues.isSuperUser
    };

    res.render('portfolio', hbs_obj);
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/signup', function(req, res) {
    res.render('signup');
});

router.post('/signup', function(req, res) {
    db.User.findOne({where:{username: req.body.username}}).then(function(result) {
        console.log(result);
        if (!result) {
        db.User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
            }).then(function(result) {
                success = {
                    signup: "You've successfully created a profile!"
                };
                res.json(success);
            });
        } else {
            error = {
                err: 'This username is already taken!'
            };
            res.json(error);
        }
    });
});

router.get('/profile', ensureAuthenticated, function(req, res) {
    var createdAt = moment(req.user.dataValues.createdAt).format('MMMM Do YYYY');
    var updatedAt = moment(req.user.dataValues.updatedAt).format('MMMM Do YYYY')
    
    hbs_obj = {
        name: req.user.dataValues.username,
        email: req.user.dataValues.email,
        createdAt: createdAt,
        updatedAt: updatedAt,
        isSuperUser: req.user.dataValues.isSuperUser
    };
    res.render('profile', hbs_obj);
});

//=============================================================//

router.get('/australia', ensureAuthenticated, function(req, res) {
    db.Country.findAll({where: {continent: 'Australia'}}).then(function(result) {
        var hbs_obj = {
            name: req.user.dataValues.username,
            result: result
        };
        res.render('countries', hbs_obj);
    });
});

router.get('/asia', ensureAuthenticated, function(req, res) {
    db.Country.findAll({where: {continent: 'Asia'}}).then(function(result) {
        var hbs_obj = {
            name: req.user.dataValues.username,
            result: result
        };
        res.render('countries', hbs_obj);
    });
});

router.get('/europe', ensureAuthenticated, function(req, res) {
    db.Country.findAll({where: {continent: 'Europe'}}).then(function(result) {
        var hbs_obj = {
            name: req.user.dataValues.username,
            result: result
        };
        console.log(result);
        res.render('countries', hbs_obj);
    });
});

router.get('/africa', ensureAuthenticated, function(req, res) {
    db.Country.findAll({where: {continent: 'Africa'}}).then(function(result) {
        console.log(req.user.dataValues)
        var hbs_obj = {
            name: req.user.dataValues.username,
            isSuperUser: req.user.dataValues.isSuperUser,
            result: result
        };
        res.render('countries', hbs_obj);
    });
});

router.get('/northAmerica', ensureAuthenticated, function(req, res) {
    db.Country.findAll({where: {continent: 'North America'}}).then(function(result) {
        var hbs_obj = {
            name: req.user.dataValues.username,
            result: result
        };
        console.log(hbs_obj.result[0].dataValues.continent)

        res.render('countries', hbs_obj);
    });
});

router.get('/southAmerica', ensureAuthenticated, function(req, res) {
    db.Country.findAll({where: {continent: 'South America'}}).then(function(result) {
        var hbs_obj = {
            name: req.user.dataValues.username,
            result: result
        };
        res.render('countries', hbs_obj);
    });
});

//=============================================================//

router.get('/admin', ensureAuthenticated, function(req, res) {
    db.Country.findAll({}).then(function(result) {
        var continents = [];
        var conts = [];
        var cont_obj = [];
        var ContObj = function(continent) {
            this.continent = continent
        };

        if (req.user.dataValues.isSuperUser) {

            for (var i in result) {
                continents.push(result[i].dataValues.continent);
            }
            console.log("continents!" + continents);
            for (var j in continents) {
                if (j == 0) {
                    console.log('Added new obj due to undefined');
                    conts.push(continents[j]);
                    cont_obj[cont_obj.length] = new ContObj(continents[j])
                    console.log(cont_obj);
                    continue;
                }
                for (var f in conts) {
                    console.log("INDEX" + conts);
                    var cont_index = conts.indexOf(continents[j]);
                    if (cont_index === -1) {
                        console.log('Added new Cont!');
                        conts.push(continents[j]);
                        cont_obj[cont_obj.length] = new ContObj(continents[j])
                        console.log(cont_obj);
                    }
                }
            }
            console.log(conts);
            console.log(cont_obj);
                        
            hbs_obj = {
                continents: cont_obj,
                result: result
            };
            console.log(hbs_obj.continents)

            res.render('admin', hbs_obj);
        } else {
            res.redirect('/');
        }
    });
});

router.post('/country-builder', ensureAuthenticated, function(req, res) {
    if (req.user.dataValues.isSuperUser) {

        db.Country.create({
            continent: req.body.continent,
            country: req.body.country,
            bty: req.body.bty,
            foods: req.body.foods,
            religions: req.body.religions,
            brief_history: req.body.brief_history,
            facts: req.body.facts,
            fun_fact: req.body.fun_fact
        }).then(function(result) {
            res.json(result);
        });
    } else {
        res.redirect('/');
    }
});

router.post('/country-select', ensureAuthenticated, function(req, res) {
    if (req.user.dataValues.isSuperUser) {

        db.Country.findOne({where:{country: req.body.country}}).then(function(result) {
            res.json(result);
        });
    } else {
        res.redirect('/');
    }
});

router.post('/edit-country', ensureAuthenticated, function(req, res) {
    
    if (req.user.dataValues.isSuperUser) {

        console.log(req.body.bty);
        db.Country.update({
            bty: req.body.bty,
            foods: req.body.foods,
            religions: req.body.religions,
            brief_history: req.body.brief_history,
            facts: req.body.facts,
            fun_fact: req.body.fun_fact,
        },{where:{country: req.body.country}}).then(function(result) {
            
            if (result[0] === 1) {
                success = {
                    updated: "Country updated successfully!"
                };
                res.json(success);
            } else {
                error = {
                    err: "Something went wrong :("
                };
                res.json(error);
            }
        });
    } else {
        res.redirect('/');
    }
});


//=============================================================//

router.post('/pass-confirm', ensureAuthenticated, function(req, res) {
    db.User.findOne({where:{username: req.user.dataValues.username}}).then(function(result) {
        if (req.user.dataValues.password === req.body.password) {
            console.log('THE PASSWORD MATCHES!!!');
            success = {
                valid: 'Your password you entered is valid'
            };
            res.json(success);
        } else {
            error = {
                err: "You've entered an incorrect password!"
            };
            res.json(error);
        }
    });
});

router.post('/pass-update', ensureAuthenticated, function(req, res) {
    db.User.update({
        password: req.body.password
    },{where:{username: req.user.dataValues.username}}).then(function(result) {
        console.log(result);
        if (result[0] === 1) {
            success = {
                updated: "Your password has successfully been updated!"
            };
            res.json(success);
        } else {
            error = {
                err: "Something went wrong :("
            };
            res.json(error);
        }
    });
});

router.post('/email-update', ensureAuthenticated, function(req, res) {
    db.User.update({
        email: req.body.email,
    },{where:{username: req.user.dataValues.username}}).then(function(result) {
        if (result[0] === 1) {
            success = {
                updated: "Your email has successfully been updated!"
            };
            res.json(success);
        } else {
            error = {
                err: "Something went wrong :("
            };
            res.json(error);
        }
    });
});

//=============================================================//




router.post('/clock', function(req, res) {
    var tz = req.body.tz;
    console.log(tz);
    clock = {
        time: moment().tz(tz).format('MMMM Do YYYY, h:mm a')
    };
    res.json(clock);
});

router.post('/apiCountry', function(req, res) {
    extAPI(req.body.country, function(info){
        res.send(info)
    })
})

module.exports = router;