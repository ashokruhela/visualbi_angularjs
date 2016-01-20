var express = require('express'),
    router = express.Router(),
    User = require('../model/user');


router.get('/:id', function(req, res, next) {
    var email = req.params.id;
	
    if(email) {
        User.getDashboard(email, function(data){
			  //change to res.json
            res.json(data);
        });
    } else
        res.json({});
});

module.exports = router;