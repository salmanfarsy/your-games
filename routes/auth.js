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
            console.log(err)
        } else{
            passport.authenticate('local')(req, res, ()=>{
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
    failureRedirect:'/login'
}) ,(req, res)=>{});

router.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('back');
})



module.exports = router;