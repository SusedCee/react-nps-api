//This is where we will set up our db connection
const mongoose = require('mongoose');

console.log(process.env.MONGODB_URI)

//updating app for heroku
// const connectionString = process.env.MONGODB_URI;

//parks is the name of our database
//that is automatically created 
// This is what I took off where it now says process.env.MONGO_URI
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
});

mongoose.connection.on('connected', () => {
	console.log('Mongoose is connected')
});

mongoose.connection.on('error', (err) => {
	console.log('Mongoose failed to connect')
});

mongoose.connection.on('disconnected', () => {
	console.log('Mongoose is disconnected')
});