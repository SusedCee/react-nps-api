require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');


require('./db/db');

app.use(session({
	secret: 'stinky scratcher',
	resave: false,
	saveUninitialized: false
}));




//SET UP CORS AS MIDDLEWARE, so any client can make a request to our server
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const corsOptions = {
	origin: 'http://localhost:3000', // when you deploy your react app, this is where you put the address,
	credentials: true, // allowing cookies to be sent with requests from the client (session cookie),
	optionSuccessStatus: 200 // some legacy browsers IE11 choke on a 204, and options requests
}

app.use(cors(corsOptions));


//Require the controller after the middleware
const authController = require('./controllers/authController');
const favoriteController = require('./controllers/favoriteController');
const parkController = require('./controllers/parkController');


app.use('/api/v1/favorite', favoriteController);
app.use('/auth', authController);
app.use('/api/v1/park', parkController);

// app.get('/', async (req.res) => {
// 	res.send("Hi")
// }


app.listen(process.env.PORT, () => {
	console.log('listening on port 9000');
});

