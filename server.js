var http = require ('http');
﻿var express = require('express');
var process = require('process');
var app = require('./config/express')(app);
require('./config/passport')();
require('./config/database.js')('mongodb://condrepo:Condrepo_123@ds331568.mlab.com:31568/heroku_hdrqdmfd');
const PORT = process.env.PORT || 3000;
http.createServer(app).listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
