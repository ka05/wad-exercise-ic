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
var router = express.Router();              // get an instance of the express Router

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// send signup page to client
router.get('/signup', function(req, res){
  res.render('signup', {title:'signup'});
});

// get data from client
router.post('/signup', function(req, res){
  var username = req.body.username;

  var user = new User({
    username : username
  });

  user.save(function (err, data) {
    if (err) console.log(err);
    else console.log('Saved : ', data );
  });

  res.send('success: ' + username);
});

// for users page
router.get('/users', function(req, res){
  User.find({}, function(err, users){
    var resUsers = [];
    users.forEach(function(user) {
      resUsers.push(user.username);
    });
    res.render('users', {title:'users', users:resUsers});
  });
});

// more routes for our API will happen here

// START THE SERVER
// =============================================================================
var port = 8080
app.listen(port);
console.log('Magic happens on port ' + port);
