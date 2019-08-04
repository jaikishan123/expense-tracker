const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const httpStatus = require('http-status');
const APIError = require('../utils/APIErrors.js');

const SALT_WORK_FACTOR = 10;
/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

/**
 * - pre-save hooks
 */

// The following pre-save hook will hash the user password before saving to mongodb
UserSchema.pre('save', function hashPassword(next) {
  if (!this.isModified('password')) return next();
  bcrypt
    .hash(this.password, SALT_WORK_FACTOR)
    .then(function setHash(hash) {
      this.password = hash;
      return next();
    })
    .catch(err => {
      next(err);
    });
  return next();
});

/**
 * Statics
 */

UserSchema.statics = {
  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 30 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then(user => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  }
};
module.exports = mongoose.model('User', UserSchema);
