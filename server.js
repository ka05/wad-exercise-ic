// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongo = require('mongoose');

var db = mongo.connect("mongodb://admin:fr1end@ds055584.mongolab.com:55584/express-service");
var Schema = mongo.Schema;
var userSchema = new Schema({
  username : String
});
var User = mongo.model('User', userSchema);

// need body parser if using form actions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'jade');

// ROUTES FOR OUR API
// =============================================================================


// more routes for our API will happen here

// START THE SERVER
// =============================================================================
var port = 8080;
app.listen(port);
console.log('Magic happens on port ' + port);
