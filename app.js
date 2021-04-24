const express = require('express'),
app = express(),
gameRoute = require('./routes/games'),
commentRoute = require('./routes/comment'),
authRoute = require('./routes/auth'),
Game     = require('./models/game'),
Comment = require('./models/comment'),
User   = require('./models/user'),
methodOverride = require('method-override'),
passport      = require('passport'),
localStrategy = require('passport-local'),
session      = require('express-session'),
flash       = require('connect-flash'),
mongoose = require('mongoose');
app.use(flash());
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
app.use(session({
  secret:'Cricket used to be my favourite game',
  resave:false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new localStrategy(User.authenticate()));
app.use((req, res, next)=>{
  res.locals.user = req.user;
  res.locals.error = req.flash('error');
  res.locals.done = req.flash('done');
  next();
})

app.get('/', (req, res)=>{
    res.render('home');
});
app.use(authRoute);
app.use(gameRoute);
app.use(commentRoute);


app.listen(3000, ()=>{
  console.log('your new server is running')
});