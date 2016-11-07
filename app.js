const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');


//Imported the routes
const indexRoute = require('./routes/index');
const guestbook = require('./routes/guestbook');

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


//routes setup
app.use('/', indexRoute);
app.use('/guestbook', guestbook);


app.listen('3000', () => {
    console.log('Go to port 3000 for awesomeness...')
});
