const e = require('express');

const express = require('express'),
app = express(),
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
const gameSchema = mongoose.Schema({
    title:String,
    rating:Number,
    released:Number,
    body:String,
    image:String,
    created:{type:Date, default:Date.now}
})
const Game = mongoose.model('Game', gameSchema);

app.get('/', (req, res)=>{
    res.render('home');
});
app.get('/games', (req, res)=>{
  Game.find({}, (err, games)=>{
    if(err){
      console.log('first', err)
    } else{
      res.render('index', {games:games})
    }
  })
});
app.get('/games/new', (req, res)=>{
  res.render('form')
});

app.post('/games', (req, res)=>{
  const input = req.body.game;
  Game.create(input, (err, newGame)=>{
    if(err){
      console.log('second', err)
    } else{
      res.redirect('/games')
    }
  })
});

app.get('/games/:id', (req, res)=>{
  const id = req.params.id;
  Game.findById(id, (err, game)=>{
    if(err){
      console.log('THird', err)
    } else{
      res.render('show', {game:game})
    }
  })
});
app.get('/games/:id/edit', (req, res)=>{
  const id = req.params.id;
  Game.findById(id, (err, game)=>{
    if(err){
      console.log('fourth', err)
    } else{
     res.render('edit', {game:game})
    }
  });
});

app.put('/games/:id', (req, res)=>{
  const id = req.params.id;
  const input = req.body.game;
  Game.findByIdAndUpdate(id, input, (err, uptade)=>{
    if(err){
      console.log('fifth', err)
    } else{
      res.redirect(`/games/${id}`)
    }
  })
});

app.get('/games/:id/delete', (req, res)=>{
  Game.findById(req.params.id, (err, game)=>{
    if(err){
      console.log('sixth', err)
    } else{
      res.render('delete', {game:game})
    }
  })
});
app.delete('/games/:id', (req, res)=>{
  const id = req.params.id;
  Game.findByIdAndRemove(id, (err, done)=>{
    if(err){
      console.log('seventh', err)
    } else{
      res.redirect('/games')
    }
  })
})

app.listen(3000, ()=>{
  console.log('your new server is running')
});