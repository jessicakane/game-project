const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema ({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
    highScore: { type: Number, required: true},
    isAdmin: Boolean,
  });
  
const User = mongoose.model('User', userSchema);

module.exports = {User}
