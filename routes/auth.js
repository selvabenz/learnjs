const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

/*
router.get('/signup', (req, res) => {
    res.render('signup');
});
*/
module.exports = router;