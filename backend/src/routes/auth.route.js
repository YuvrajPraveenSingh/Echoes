const express = require('express');
const authRoutes = express.Router();
const { body } = require("express-validator")
const { Resgister, Login, Logout, Profile } = require('../contollers/auth.contoller')

/**
 * @route POST api/v1/auth/signup
 * @desc Register a new user
 * @access Public
 */
authRoutes.post('/signup',  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name is too short'),
    body('fullName.lastName').isLength({ min: 3 }).withMessage('Last name is too short'),
    body('password').isLength({ min: 8 }).withMessage('Password is too short'),
], Resgister)

/**
 * @route POST api/v1/auth/login
 * @desc login user
 * @access Public
 */ 
authRoutes.post('/login',[
    body('email').isEmail().withMessage('Invalid credentials'),
    body("password").isLength({min :8}).withMessage('Invalid credentials')
] ,  Login)
authRoutes.get('/logout', Logout)
authRoutes.get('/me', Profile)

module.exports = authRoutes;