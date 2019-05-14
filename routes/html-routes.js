var db = require('../models');
var exphbs = require('express-handlebars');
var path =  require('path');

modules.exports = function(app) {
    
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + '/index.html'));
    });

    app.get('/north_america', function(req, res) {
        res.sendFile(path.join(__dirname + '/north_america.html'));
    });

    app.get('/europe', function(req, res) {
        res.sendFile(path.join(__dirname + '/europe.html'));
    });

    app.get('/australia', function(req, res) {
        res.sendFile(path.join(__dirname + '/australia.html'));
    });
};