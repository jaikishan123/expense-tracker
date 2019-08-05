const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const APIError = require('../utils/APIErrors.js');
const userModel = require('../user/user.model');
const config = require('../../config/config');

/**
 * Login a user and return JWT token
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.password - The password of user.
 * @returns {token, username: req.body.username} - A json containing token and username
 */
function login(req, res, next) {
  const userObject = {};
  userModel
    .findOne({ username: req.body.username })
    .exec()
    .then(user => {
      if (user) {
        userObject.username = user.username;
        userObject.id = user._id; // eslint-disable-line no-underscore-dangle
        return bcrypt.compare(req.bod.password, user.password);
      }
      const error = new APIError(
        'username does not exists',
        httpStatus.UNAUTHORIZED,
        true
      );
      return Promise.reject(error);
    })
    .then(response => {
      if (response) {
        const token = jwt.sign(userObject, config.jwtSecret, {
          expiresIn: '24h'
        });
        return res.json({ token, username: req.body.username });
      }
      const error = new APIError(
        'Password does not match',
        httpStatus.UNAUTHORIZED,
        true
      );
      return Promise.reject(error);
    })
    .catch(error => {
      next(error);
    });
}

module.exports = { login };
