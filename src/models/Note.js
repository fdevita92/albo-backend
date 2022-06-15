const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
  //text: { type: String, required: true },
  number:  { type: Number, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  pec: { type: String, required: true },
  taxcode: { type: String, required: true },
  categories_soa: { type: Array, required: true },
  categories_not_soa: { type: Array, required: true },
  isWinner: { type: String, required: false },
  winnerDate: { type: String, required: false },
});

const Note = mongoose.model('note', noteSchema);

module.exports = Note;
