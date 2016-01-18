var express = require('express'),
    router = express.Router(),
    User = require('../model/user');


router.get('/:id', function(req, res, next) {
    var email = req.params.id;
	
    if(email) {
        User.getDashboard(email, function(data){
			  console.log("in dashboard. ", data);
            res.send(data);
        });
    } else
        res.send({});
});

module.exports = router;