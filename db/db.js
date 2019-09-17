//This is where we will set up our db connection
const mongoose = require('mongoose');
//updating app for heroku
const connectionString = process.env.MONGODB_URI;

//parks is the name of our database
//that is automatically created 
// mongoose.connect('mongodb://localhost/parks', {
// 	useNewUrlParser: true,
// 	useCreateIndex: true,
// 	useFindModify: false
// });

mongoose.connection.on('connected', () => {
	console.log('Mongoose is connected')
});

mongoose.connection.on('error', (err) => {
	console.log('Mongoose failed to connect')
});

mongoose.connection.on('disconnected', () => {
	console.log('Mongoose is disconnected')
});