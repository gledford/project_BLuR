/**
 * New node file
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    firstname: String,
    lastname: String,
    email: String,
    date: { type: Date, default: Date.now }
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);