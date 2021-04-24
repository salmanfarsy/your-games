const express = require('express');
const router  = express.Router();
const User   = require('../models/user');
const passport = require('passport');
router.get('/register', (req, res)=>{
    res.render('auth/form');
});

router.post('/register', (req, res)=>{
    User.register(new User({username : req.body.username}), req.body.password, (err, done)=>{
        if(err){
            console.log(err);
            req.flash('error', 'user already exist or something went wrong');
            res.redirect('back');
        } else{
            passport.authenticate('local')(req, res, ()=>{
                req.flash('done', 'Welcome new User')
                res.redirect('/games')
            })
        }
    })
});
router.get('/login', (req, res)=>{
    res.render('auth/new');
})

router.post('/login', passport.authenticate('local', {
    successRedirect:'/games',
    failureRedirect:'/login',
    successFlash:'welcome new user',
    failureFlash:'User not found'
}) ,(req, res)=>{});

router.get('/logout', (req, res)=>{
    req.logout();
    req.flash('done', 'successfully logged out')
    res.redirect('back');
})



module.exports = router;