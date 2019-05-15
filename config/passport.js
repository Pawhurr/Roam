
const session = require('express-session');
const cookieparser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const db = require('../models');

module.exports = (app) => {

  app.use(cookieparser());
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,

    rolling: true,
    name: 'sid', 
    cookie: {
      httpOnly: true,
      maxAge: 20 * 60 * 1000,
    }
  }));
  app.use(flash());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(function (userId, done) {
    db.User.findByPk(userId)
      .then(function (user) {
        done(null, user);
      })
      .catch(function (err) {
        done(err);
      });
  });
  passport.use(new LocalStrategy({usernameField: 'username', passwordField: 'password'},(username, password, done) => {
    const errorMsg = 'Invalid username or password';

    db.User.findOne({username: username})
      .then(function(user) {
        console.log(user);
        if (!user) {
          return done(null, false, {message: errorMsg});
        }
        return db.User.validatePassword(user, password)
        .then(isMatch => done(null, isMatch ? user : false, isMatch ? null : { message: errorMsg }));
      })
      .catch(done);
  }));

  app.use(passport.initialize());
  app.use(passport.session());
}








// var passport = require('passport');
// var db = require('../models');
// var auth = require('./auth.js');
// var Strategy = require('passport-local').Strategy;
// var sequelize = require('sequelize');


// module.exports = function(passport) {

//     passport.use(new Strategy(
//         function(username, password, cb) {
//             db.User.findOne({where:{username: username}}).then(function(err, user){
    
//                 if (err) { return console.log(err); }
//                 if (!user) { return cb(null, false); }
//                 if (user.password != password) { return cb(null, false); }
//                 return cb(null, user);
//             });
//     }));
    
//     passport.serializeUser(function(user, done) {
//         done(null, user.id);
//       });
      
//     passport.deserializeUser(function(id, cb) {
//         db.users.findById(id, function (err, user) {
//             if (err) { return cb(err); }
//             cb(null, user);
//         });
//     });
// } 