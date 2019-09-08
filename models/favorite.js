const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
	park: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Park'
	},
	notes: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

//Exporting the whole favorite array
//and it will be named whatever we require as
module.exports = mongoose.model('Favorite', FavoriteSchema);