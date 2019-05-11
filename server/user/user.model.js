const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

// The following pre-save hook will hash the user password before saving
UserSchema.pre('save', function hashPassword(next) {
  if (!this.isModified('password')) return next();
  bcrypt
    .hash(this.password, SALT_WORK_FACTOR)
    .then(function setHash(hash) {
      this.password = hash;
      return next();
    })
    .catch(next);
  return next();
});

module.exports = mongoose.model('User', UserSchema);
