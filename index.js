const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

// Instructions:
// 1. set keys for passport to run in config/keys.js, acquire keys from console.developer.google.com google+ api.
// 2. set mongoURI to connect to database in config/keys.js
// 3. set cookie key in config/keys.js

// app declaration
const app = express();

// middlewares

// encrypts and manages the life of cookie that is to be stored by the browser
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

// require files to be executed
// 1--passport service
require('./models/User'); //should be before passport require as it is being used in it.
require('./services/passport');


// connecting mongoose to mongodb database
mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
    .then(() => console.log('connected to databse...'))
    .catch(() => console.log('could not connect to database...'));


// routes
const authRoutes = require('./routes/authRoutes');

// use routes
app.use('/api/auth', authRoutes);

// dummy route
app.get('/', (req, res) => {
    res.json({msg: "hi there"});
})

// set the port for env(heroku) or machine: 8000
const PORT = process.env.PORT || 8000;

// listen app on port PORT
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})