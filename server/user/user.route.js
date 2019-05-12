const express = require('express');
const userCtrl = require('./user.controller.js');

const router = express.Router();
/**
 * Load user when API with userId route parameter is hit
 */
router.param('userId', userCtrl.load);

router
  .route('/')
  /** GET /api/users - Get list of users */
  .get(userCtrl.list);
