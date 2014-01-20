var path = require('path');

exports.index = function(req, res){
  res.render('index', { title: 'Project_BLuR' });
};

exports.ping = function(req, res){
  res.send("pong!", 200);
};