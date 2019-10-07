var http = require ('http');
﻿var express = require('express');
var app = require('./config/express')(app);
require('./config/passport')();
require('./config/database.js')('mongodb://condrepo:Condrepo_123@ds331568.mlab.com:31568/heroku_hdrqdmfd');
http.createServer(app).listen(app.get('port'), function(){    
    console.log('Server escutando a porta ' + app.get('port'));
});
