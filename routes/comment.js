const express = require('express');
const router  = express.Router();
const Comment = require('../models/comment');
const Game    = require('../models/game');
const middleware = require('../middleware');

router.post('/games/:id/comment',middleware.check, (req, res)=>{
    Game.findById(req.params.id, (err, game)=>{
        if(err){
            console.log(err)
        } else{
            Comment.create(req.body.comment, (err, comment)=>{
                if(err){
                    console.log(err)
                } else{
                    comment.author.username = req.user.username;
                    comment.author.id = req.user._id; 
                    comment.save();
                    game.comments.push(comment);
                    game.save();
                    res.redirect('/games/' + req.params.id)
                }
            })
        }
    })
});
router.get('/games/:id/comment/:com/edit', middleware.gameAuth, (req, res)=>{
            Comment.findById(req.params.com, (err, comment)=>{
                if(err){
                    console.log(err)
                } else{
                    res.render('comment/edit', {comment : comment, id : req.params.id})
                }
            })
            
        });
router.put('/games/:id/comment/:com', middleware.gameAuth, (req, res)=>{
    Comment.findByIdAndUpdate(req.params.com, req.body.comment, (err, done)=>{
        if(err){
            console.log(err)
        } else{
            res.redirect('/games/' + req.params.id)
        }
    })
});

router.delete('/games/:id/comment/:com', (req, res)=>{
    Comment.findByIdAndDelete(req.params.com, (err, done)=>{
        if(err){
            console.log(err)
        } else{
            res.redirect('/games/' + req.params.id) 
        }
    })
})
module.exports = router;