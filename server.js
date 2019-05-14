var express = require("express");
var db = require("./models");
var app = express();
var routes = require('./routes/api-routes.js');
var exphbs = require('express-handlebars');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var Strategy = require('passport-local').Strategy;
require('./config/passport')(app);

app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({secret: 'TravelBug'}));

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);
app.use((error, req, res, next) => {
    console.error(error);
    res.render('error', {
      user: req.user,
      error
    });
});

app.post('/login', passport.authenticate('local', 
{successRedirect: '/city', failureRedirect: '/login', failureFlash: true }
));

var PORT = process.env.PORT || 8080;

db.sequelize.sync({force: true}).then(function() {
    app.listen(PORT, function() {
        console.log("Listening on port: ", PORT);
    });
});