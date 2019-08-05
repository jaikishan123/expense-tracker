const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const config = require('../../config/config.js');
const APIError = require('../utils/APIErrors.js');

function authenticateUser(req, res, next) {
  let token = req.headers['x-access-token'];
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    try {
      // verify makes sure that the token hasn't expired and has been issued by us
      const result = jwt.verify(token, config.jwtSecret, {
        expiresIn: '24h'
      });

      // Let's pass back the decoded token to the request object
      req.decoded = result;
      if (req.decoded.id !== req.params.userId) {
        const error = new APIError(
          'User unaothorized',
          httpStatus.UNAUTHORIZED,
          true
        );
        return next(error);
      }
      // We call next to pass execution to the subsequent middleware
      next();
    } catch (err) {
      // Throw an error just in case anything goes wrong with verification
      const error = new APIError(
        'Access Token invalid',
        httpStatus.UNAUTHORIZED,
        true
      );
      return next(error);
    }
  }
  const error = new APIError(
    'Auth token is not supplied',
    httpStatus.UNAUTHORIZED,
    true
  );
  return next(error);
}

module.exports = { authenticateUser };
