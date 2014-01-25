var passport = require('passport');
var Account = require('./models/account');

module.exports = function (app) {
    
  app.get('/', function (req, res) {
      res.render('index.html', { user : req.user });
  });

  app.get('/register', function(req, res) {
    var defaultData = { errorString : "", username : "", firstname : "", lastname : "", email : "" };
    res.render('register.html', defaultData);
  });

  app.post('/register', function(req, res) {
    if(req.body.password == req.body.password_confirmation)
    {
      var username = req.body.username.toLowerCase();

      Account.register(new Account
        ({ 
          username : username, 
          firstname : req.body.firstname, 
          lastname : req.body.lastname,
          email : req.body.email
        }), 
        req.body.password, function(err, account) {
          if (err) {
            var error = "Sorry. That username already exists. Try again.";
            var inputData = { errorString : error, username : req.body.username, firstname : req.body.firstname, lastname : req.body.lastname,
              email : req.body.email };
            return res.render('register', inputData);
          }

          passport.authenticate('local')(req, res, function () {
            res.redirect('index.html');
          });
      });
    }
    else
    {
      var error = "Your passwords do not match. Please enter the same password";
      var inputData = { errorString : error, username : req.body.username, firstname : req.body.firstname, lastname : req.body.lastname,
        email : req.body.email };
      res.render('register.html', inputData);
    }
  });

  app.get('/login', function(req, res) {
      res.render('login.html', { user : req.user });
  });

  app.post('/login', passport.authenticate('local'), function(req, res) {
      res.redirect('/'), { user : req.user };
  });

  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });
  
};