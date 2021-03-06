var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
  email : {type: String},
  passwordHash : {type: String},
  username: {type: String}
});

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.passwordHash);
}

userSchema.methods.safeUser = function () {
  return {
    _id: this._id,
    username: this.username
  };
}

module.exports = mongoose.model('User', userSchema);
