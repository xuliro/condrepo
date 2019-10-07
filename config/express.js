var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var helmet = require('helmet');
var cors = require('cors');

module.exports = function () {
  var app = express();
  app.set('port', 80);
  app.use(cors());
  app.use(express.static('./public'));
  app.set('view engine', 'ejs');
  app.set('views', './app/views');
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(session({
    secret: 'homem avestruz',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(helmet.noSniff());
  app.use(helmet.xssFilter());
  app.use(helmet.frameguard());
  app.use(helmet.hidePoweredBy({
    setTo: 'PHP 5.5.14'
  }));
  load('models', {
      cwd: 'app'
    })
    .then('controllers')
    .then('routes/auth.js')
    .then('routes')
    .into(app);
  app.get('*', function (req, res) {
    res.status(404).render('404');
  });
  return app;
};
