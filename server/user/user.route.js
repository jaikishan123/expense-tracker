const express = require('express');
const validate = require('express-validation');
const userCtrl = require('./user.controller.js');
const validation = require('../../config/validations/user.validation.js');
const authenticate = require('../middlewares/authenticate.js');

const router = express.Router();
/**
 * Load user when API with userId route parameter is hit
 */
router.param('userId', userCtrl.load);

router
  .route('/')
  /** GET /api/users - Get list of users */
  .get(userCtrl.list)
  /** POST /api/users - Create new user */
  .post(validate(validation.createUser), userCtrl.create);

router
  .route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(authenticate.authenticateUser, userCtrl.get)

  /** PUT /api/users/:userId - Replace user */
  .put(
    authenticate.authenticateUser,
    validate(validation.replaceUser),
    userCtrl.replace
  )

  /** DELETE /api/users/:userId - Delete user */
  .delete(authenticate.authenticateUser, userCtrl.remove);

module.exports = router;
