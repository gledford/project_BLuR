var passport = require('passport');
var Account = require('./models/account');

module.exports = function (app) {
    
  app.get('/', function (req, res) {
	  console.log("/ :" + req.body);
      res.render('index', { user : req.user });
  });

  app.get('/register', function(req, res) {
	  console.log("/register :" + req.body);
      res.render('register', { });
  });

  app.post('/register', function(req, res) {
      console.log("/register :" + req.body);
      Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
          if (err) {
            return res.render("register", {info: "Sorry. That username already exists. Try again."});
          }

          passport.authenticate('local')(req, res, function () {
            res.redirect('/');
          });
      });
  });

  app.get('/login', function(req, res) {
	  console.log("/login :" + req.body);
      res.render('login', { user : req.user });
  });

  app.post('/login', passport.authenticate('local'), function(req, res) {
	  console.log("/login :" + req.body);
      res.redirect('/');
  });

  app.get('/logout', function(req, res) {
	  console.log("/logout :" + req.body);
      req.logout();
      res.redirect('/');
  });

  app.get('/ping', function(req, res){
      console.log("/ping :" + req.body);
	  res.send("pong!", 200);
  });
  
};