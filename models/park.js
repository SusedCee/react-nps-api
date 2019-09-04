const mongoose = require('mongoose');

const ParkSchema = new mongoose.Schema({
	fullName: String,
	states: String,
	description: String,
	directionsInfo: String,
	url: String,
})

//Exporting the whole park array
//and it will be names whatever we require as
module.exports = mongoose.model('Park', ParkSchema);