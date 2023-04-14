const express = require('express');
const router = express.Router();
const userContoller=require('../controllers/auth');

router.get(['/','/login'], (req, res) => {
    res.render('login');
});


router.get('/signup', (req, res) => {
    res.render('signup');
});

/*
router.get('/profile', userContoller.isLoggedIn, (req, res) => {
    // console.log(req.name);
 if (req.user) {
     res.render('profile', {user: req,user});
 }else{
    res.render('/login');
 }
});
*/
router.get('/home', userContoller.isLoggedIn, (req, res) => {
       // console.log(req.name);
    if (req.user) {
        res.render('home', {user: req.user});
    }else{
       res.redirect('/login');
    }
});

module.exports = router;