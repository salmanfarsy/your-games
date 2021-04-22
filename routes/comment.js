const express = require('express');
const router  = express.Router();
const Comment = require('../models/comment');
const Game    = require('../models/game');

router.post('/games/:id/comment', (req, res)=>{
    Game.findById(req.params.id, (err, game)=>{
        if(err){
            console.log(err)
        } else{
            Comment.create(req.body.comment, (err, comment)=>{
                if(err){
                    console.log(err)
                } else{
                    comment.save();
                    game.comments.push(comment);
                    game.save();
                    res.redirect('/games/' + req.params.id)
                }
            })
        }
    })
})

module.exports = router;