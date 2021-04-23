const mongoose = require('mongoose');
const passmon  = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password:String
});

userSchema.plugin(passmon);
module.exports = mongoose.model('User', userSchema);