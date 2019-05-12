const User = require('./user.model');
/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.get(id)
    .then(user => {
      req.user = user;
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}
/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}
/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.password - The password of user.
 * @returns {User}
 */
function create(req, res, next) {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user
    .save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Replace existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.password - The password of user.
 * @returns {User}
 */
function replace(req, res, next) {
  const { user } = req;
  user.username = req.body.username;
  user.password = req.body.password;

  user
    .save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

function remove(req, res, next) {
  const { user } = req;

  // TODO: Remove all the expenses made by the user when a user is deleted
  user
    .remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

module.exports = { list, create, load, get, replace, remove };
