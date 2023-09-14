const mongoose = require('mongoose');
const {Schema} = mongoose;

const scoreSchema = new Schema ({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  });
  
const Score = mongoose.model('Score', scoreSchema);

module.exports = {Score}
