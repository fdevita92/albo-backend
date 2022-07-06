const mongoose = require('mongoose');
const { Schema } = mongoose;

const supplySchema = new Schema({
  //text: { type: String, required: true },
  number:  { type: Number, required: true, unique:true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  pec: { type: String, required: true },
  email: {type: String, required:false},
  vat_number: {type: String, required:false},
  taxcode: { type: String, required: true },
  categories:  { type: [String], required: true },

});

const Supply = mongoose.model('supply', supplySchema);

module.exports = Supply;