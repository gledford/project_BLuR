var passport = require('passport');
var Account = require('./models/account');

module.exports = function (app) {
    
  app.get('/', function (req, res) {
      res.render('index', { user : req.user });
  });

  app.get('/register', function(req, res) {
      res.render('register', { });
  });

  app.post('/register', function(req, res) {
    //console.log(req);
    var username = req.body.username.toLowerCase();
    console.log(username);
    Account.register(new Account
      ({ 
      username : username, 
      firstname : req.body.firstname, 
      lastname : req.body.lastname,
      email: req.body.email
      }), 
      req.body.password, function(err, account) {
        if (err) {
          return res.render("register", {info: "Sorry. That username already exists. Try again."});
        }

        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });
    });
  });

  app.get('/login', function(req, res) {
      res.render('login', { user : req.user });
  });

  app.post('/login', passport.authenticate('local'), function(req, res) {
      res.redirect('/');
  });

  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  app.get('/ping', function(req, res){
	  res.send("pong!", 200);
  });
  
};