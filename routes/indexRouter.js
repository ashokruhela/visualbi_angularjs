var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    path = require('path'),
    utils = require('./utils'),
    User = require('../model/user'),
    passport = require('./passport');




// Login page
router.get('/', function(req, res, next) {
   res.render('login');
});

router.post('/login', passport.authenticate('local'),function(req, res){
	 console.log('login request received')
	 console.log(req.user);
	 res.json(req.user);
//	 res.json({
//		  email: req.user.email,
//		  password: req.user.name
//	 });
	 
});

router.post('/oldlogin', passport.authenticate('local', {
   successRedirect: '/',
   failureRedirect:'/login',
   failureFlash: 'Invalid username or password.'
}));

function isAuthenticated(req,res,next){
	 if(req.isAuthenticated()) return next();
	 res.redirect('/');
}

module.exports = router;
