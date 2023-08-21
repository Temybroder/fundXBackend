const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs');
const passport = require('passport');
const {v4 : uuidv4} = require('uuid');
const dbMain = require('../../../../vars/db');

const { requireAuthentication } = require('../../middlewares/Authentication');

const {userReg} = require('../../controllers/userAuthController');

// Route to test authentication
router.get('/tk', requireAuthentication, (req, res, next) => {
  res.json(`Hey there, Congratulations. Third test passed`)
});


//ROUTES
// Post route for Registration
// Get Route for Login
// Post route for login
// Logout handled in-mobile-app

// Register New User
router.post('/auth1/reg', userReg);

// Login Route
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/auth/loginsuccess',
      failureRedirect: '/auth/loginfailure',
      failureFlash: true
    })(req, res, next);
  });

// Login Success Redirect
router.get('/loginsuccess', (req, res, next) => {
  return res.status(200).json(req.session.passport.user + " and cookie is " + req.headers.cookie)
});

// Login Failure Redirect
router.get('/loginfailure', (req, res, next) => {
  return res.status(400).json('Authentication Failure')
});


module.exports = router;  