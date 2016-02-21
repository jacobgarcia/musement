var express = require('express');
var router = express.Router();

//================================== MIDDLEWARES ===============================
 router.post('/', passport.authenticate('local-login', {
     successRedirect: '/home',
     failureRedirect: '/login'
 }));

    router.get('/login', (req, res) => {
        res.render('login', {
            title: 'Hey',
            message: 'Hello there!'
        });
    });
module.exports = router;
