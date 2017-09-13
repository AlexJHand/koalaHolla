var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require( 'path' );
var port = process.env.PORT || 5000;

// routers
var koalaRouter = require('../routes/koala');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// routes
app.use('/koala', koalaRouter);

// Start listening for requests on a specific port
app.listen(port, function(){
  console.log('listening on port', port);
});
