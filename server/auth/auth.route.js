const express = require('express');
const validate = require('express-validation');
const authCtrl = require('./auth.controller');
const validation = require('../../config/validations/auth.validation.js');

const router = express.router();

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login').post(validate(validation.login), authCtrl.login);

module.exports = router;
