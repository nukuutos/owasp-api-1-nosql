const express = require('express');

const controller = require('../controllers/auth');

const router = express.Router();

// @route     Post /api/v1/auth/sign-up
// @desc      Sign up user
// @access    Public
// router.post('/sign-up', controller.signUp);

// @route     Post /api/v1/auth/sign-in
// @desc      Sign in user
// @access    Public
router.post('/sign-in', controller.signIn);

module.exports = router;
