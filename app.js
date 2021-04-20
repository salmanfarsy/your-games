const express = require('express'),
app = express(),
gameRoute = require('./routes/games'),
Game     = require('./models/game'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
mongoose.connect('mongodb://localhost/games', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.get('/', (req, res)=>{
    res.render('home');
});
app.use(gameRoute);


app.listen(3000, ()=>{
  console.log('your new server is running')
});