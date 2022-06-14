const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
  //text: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  pec: { type: String, required: true },
  taxcode: { type: String, required: true },
  category: { type: String, required: true },
  leaderboard:{type:String, required:true},
  isWinner: { type: String, required: true },
  winnerDate: { type: String, required: true },
});

const Note = mongoose.model('note', noteSchema);

module.exports = Note;
