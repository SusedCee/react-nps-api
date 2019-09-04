const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
	parks: [],
	notes: String,
	img: {data: Buffer, contentType: String}
});

//Exporting the whole favorite array
//and it will be named whatever we require as
module.exports = mongoose.model('Favorite', FavoriteSchema);