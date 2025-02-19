const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
  //text: { type: String, required: true },
  number:  { type: Number, required: true, unique:true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  pec: { type: String, required: true },
  email: {type: String, required:false},
  vat_number: {type: String, required:false,  unique:true},
  taxcode: { type: String, required: true,  unique:true },
  categories_soa: {type:[String], required: false },
  categories_not_soa: {type: [String], required: false },
  invitedDate: { type: String, required: false },
  winnerDate: { type: String, required: false },
  additional_notes: {type: String, required:false},
});

const Note = mongoose.model('note', noteSchema);

module.exports = Note;
