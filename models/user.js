const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String 
	});
//Exporting the whole users array
//and it will be named whatever we require as 
module.exports = mongoose.model('User', UserSchema);