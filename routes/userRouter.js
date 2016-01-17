var express = require('express'),
    router = express.Router(),
    User = require('../model/user');

router.get('/:id', function(req, res, next) {
    var email = req.params.id;
    if(email) {
        User.getUser(email, function(user){
            res.send(user);
        });
    } else
        res.send({});
});

module.exports = router;