const express = require('express');
const router  = express.Router();
const Game     = require('../models/game');
const Comment = require('../models/comment');
router.get('/games', (req, res)=>{
    Game.find({}, (err, games)=>{
      if(err){
        console.log('first', err)
      } else{
        res.render('game/index', {games:games})
      }
    })
  });
  router.get('/games/new', (req, res)=>{
    res.render('game/form')
  });
  
  router.post('/games', (req, res)=>{
    const input = req.body.game;
    function yt(){
      if(input.yt.length > 40){
        input.yt = input.yt.slice(32)
      } else if( input.yt.length<30){
        input.yt = input.yt.slice(17)
      }
    } ;
    yt();
   
    Game.create(input, (err, newGame)=>{
      if(err){
        console.log('second', err)
      } else{
        res.redirect('/games')
      }
    })
  });
  
  router.get('/games/:id', (req, res)=>{
    const id = req.params.id;
    Game.findById(id).populate('comments').exec((err, game)=>{
      if(err){
        console.log('THird', err)
      } else{
        res.render('game/show', {game:game})
      }
    })
  });
  router.get('/games/:id/edit', (req, res)=>{
    const id = req.params.id;
    Game.findById(id, (err, game)=>{
      if(err){
        console.log('fourth', err)
      } else{
       res.render('game/edit', {game:game})
      }
    });
  });
  
  router.put('/games/:id', (req, res)=>{
    const id = req.params.id;
    const input = req.body.game;
    function yt(){
      if(input.yt.length > 40){
        input.yt = input.yt.slice(32)
      } else if( input.yt.length<30){
        input.yt = input.yt.slice(17)
      }
    } ;
    yt();
    // input.yt = input.yt.slice(32);
    Game.findByIdAndUpdate(id, input, (err, uptade)=>{
      if(err){
        console.log('fifth', err)
      } else{
        res.redirect(`/games/${id}`)
      }
    })
  });
  
  router.get('/games/:id/delete', (req, res)=>{
    Game.findById(req.params.id, (err, game)=>{
      if(err){
        console.log('sixth', err)
      } else{
        res.render('game/delete', {game:game})
      }
    })
  });
  router.delete('/games/:id', (req, res)=>{
    const id = req.params.id;
    Game.findByIdAndRemove(id, (err, done)=>{
      if(err){
        console.log('seventh', err)
      } else{
        res.redirect('/games')
      }
    })
  });

  module.exports = router;