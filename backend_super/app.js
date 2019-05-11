const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const MONGODB_URI = 'mongodb://localhost:27017/coffee'
const app = express();

const authRoute = require('./routes/auth')

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
})

app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.use(session({
	secret : "hellohowareyou",
	resave: false,
  saveUninitialized: false,
  store: store,
	cookie: {
		secure: false,
		httpOnly: false,
		maxAge: 14*60*60*1000 // Expire in 14 hours
	}
}));

app.use('/api/auth', authRoute);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    MONGODB_URI
  )
  .then(result => {
    app.listen(5000);
  })
  .catch(err => console.log(err));