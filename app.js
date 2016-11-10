const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const session = require('express-session');


//Imported the routes
const indexRoute = require('./routes/index');
const guestbook = require('./routes/guestbook');
const users = require('./routes/users');

//connect to mongodb
mongoose.connect('mongodb://localhost/gbdoover');

//initialize express
const app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views' ));
app.set('view engine', 'jade');

//middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
//handle sessions
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
//routes setup
app.use('/', indexRoute);
app.use('/guestbook', guestbook);
app.use('/users', users);


app.get('*', (req, res, next) => {
  module.locals.user = req.user || null;
});



app.listen('3000', () => {
    console.log('Go to port 3000 for awesomeness...')
});
