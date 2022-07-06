const mongoose = require('mongoose');
const { Schema } = mongoose;

const engServiceSchema = new Schema({
  //text: { type: String, required: true },
  number:  { type: Number, required: true, unique:true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  pec: { type: String, required: true },
  email: {type: String, required:false},
  vat_number: {type: String, required:false},
  taxcode: { type: String, required: true },
  type_of_services: {type:[String], required: false },
  invitedDate: { type: String, required: false },
  winnerDate: { type: String, required: false },
});

const EngService = mongoose.model('engService', engServiceSchema);

module.exports = EngService;
