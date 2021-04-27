const Game = require('../models/game');
const Comment = require('../models/comment');
const middleware = {
     check : (req, res, next)=>{
        if(req.isAuthenticated()){
            next();
        } else{
            req.flash('error', 'Please Register Or Login')
            res.redirect('/register');
        }
    },
    gameAuth : (req, res, next)=>{
        Game.findById(req.params.id, (err, game)=>{
            if(err){
                console.log(err) 
            } else{
                if(game.author.id.equals(req.user._id)){
                    next();
                } else{
                    res.redirect('/register')
                }
            }
        })
    },
    commentAuth : (req, res, next)=>{
        Comment.findById(req.params.com, (err, game)=>{
            if(err){
                console.log(err) 
            } else{
                if(game.author.id.equals(req.user._id)){
                    next();
                } else{
                    res.redirect('/')
                }
            }
        })
    }
}

module.exports = middleware;