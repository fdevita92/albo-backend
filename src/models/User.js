const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true, unique:true },
  lastName: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true}
});

const User = mongoose.model('user', userSchema);

module.exports = User;