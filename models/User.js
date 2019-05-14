var passport = require('passport');
var sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [1] }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [8] }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [8] }
        },
        isSuperUser: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });
    User.validatePassword = function(user, password) {
        if (user.dataValues.password !== password){
            var isMatch = false;
            return Promise.resolve(isMatch);
        } else {
            var isMatch = true;
            return Promise.resolve(isMatch);
        }
    }
      return User;
};