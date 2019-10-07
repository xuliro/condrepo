var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var md5 = require('md5');
var ADDRESS = 'http://192.168.110.21:3000';
module.exports = function () {
  var User = mongoose.model('User');
  passport.use(new GitHubStrategy({
    clientID: 'e8f22ef5c8933784d964',
    clientSecret: 'e3f837b8521fb217c729849af8aa52915b51d1c9',
    callbackURL: ADDRESS + '/auth/github/callback'
  }, function (accessToken, refreshToken, profile, done) {
    User.findOne({
        'login': profile.username,
        'id': profile.id,
        'provider': profile.provider
      },
      function (err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        } else {
          var user = new User();
          user.login = profile.username;
          user.name = profile.username;
          user.email = "N/A";
          user.contact = "N/A";
          user.id = profile.id;
          user.provider = profile.provider;
          user.save(function (err) {
            if (err) {
              return done(err);
            }
            return done(null, user);
          });
        }
      });
  }));
  passport.use(new FacebookStrategy({
    'clientID': '141331136372623', // your App ID
    'clientSecret': '1af813102cad6cab0e3194efe5e806ac', // your App Secret
    'callbackURL': ADDRESS + '/auth/facebook/callback '
  }, function (token, tokenSecret, profile, done) {
    process.nextTick(function () {
      User.findOne({
          'login': profile.displayName,
          'id': profile.id,
          'provider': profile.provider
        },
        function (err, user) {
          if (err) {
            return done(err);
          }
          if (user) {
            return done(null, user);
          } else {
            var user = new User();
            user.login = profile.displayName;
            user.name = profile.displayName;
            user.email = "N/A";
            user.id = profile.id;
            user.provider = profile.provider;
            user.save(function (err) {
              if (err) {
                console.log(err);
                throw err;
              }
              return done(null, user);
            });
          }
        });
    });
  }));
  passport.use('local-login', new LocalStrategy({
    usernameField: 'login', // your App ID
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, login, password, done) {
    process.nextTick(function () {
      var pwd = md5(password);
      User.findOne({
          'login': login,
          'password': pwd
        },
        function (err, user) {
          if (err)
            return done(err);
          if (user) {
            return done(null, user);
          } else {
            console.log("Não foi possível conectar com usuario local");
            return done(err);
          }
        });
    });
  }));
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });
  passport.deserializeUser(function (id, done) {
    User.findById(id).exec()
      .then(function (user) {
        done(null, user);
      });
  });
};