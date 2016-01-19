var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    path = require('path'),
    utils = require('./utils'),
    User = require('../model/user'),
    passport = require('./passport');




// Login page
router.get('/', function(req, res, next) {
   res.render('index');
});

router.get('/logout', function(req, res, next) {
	req.logout();
   res.render('index');
});

router.post('/login', passport.authenticate('local'),function(req, res){
	 res.json(req.user);
//	 res.json({
//		  email: req.user.email,
//		  password: req.user.name
//	 });
	 
});


function isAuthenticated(req,res,next){
	 if(req.isAuthenticated()) return next();
	 res.redirect('/');
}

module.exports = router;
