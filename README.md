# mongoose-password-pbkdf2

Mongoose plugin for creating passwords with pbkdf2

## Installation

    $ npm install mongoose-password-pbkdf2

## Example

```
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var password =require('mongoose-password-pbkdf2');

//user schema
var fields = {
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
};

var UserSchema = new Schema(fields);

UserSchema.plugin(password, {
  field: 'password',
  salt: 'secret string',
  iterations: 1000,
  keylen: 64
});

module.exports = mongoose.model('User', UserSchema);

```

## License

MIT
