const express = require('express'),
app = express(),
gameRoute = require('./routes/games'),
commentRoute = require('./routes/comment'),
Game     = require('./models/game'),
Comment = require('./models/comment'),
methodOverride = require('method-override'),
mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));
mongoose.connect('mongodb://localhost/game1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});


app.get('/', (req, res)=>{
    res.render('home');
});
app.use(gameRoute);
app.use(commentRoute);


app.listen(3000, ()=>{
  console.log('your new server is running')
});