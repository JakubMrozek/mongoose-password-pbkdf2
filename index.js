var crypto = require('crypto');

module.exports = exports = function (schema, options) {
  if (!options.salt) throw new Error('salt option is required!');
  var field = options.field || 'password';
  var iterations = options.iterations || 1000;
  var keylen = options.keylen || 64;

  schema.pre('validate', function (next) {
    var password = this[field];

    //validation error, password field has to be set
    if (typeof password === 'undefined') return next();

    password = password.trim();

    //validation error, password field is empty
    if (password === '') return next();

    //creates hash only if password was updated
    if (!this.isModified) return next();

    crypto.pbkdf2(password, options.salt, iterations, keylen, function(err, result){
      if (err) return next(err);
      this[field] = result.toString('hex');
      next();
    }.bind(this));

  });
}
