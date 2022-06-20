const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceSchema = new Schema({
  //text: { type: String, required: true },
  number:  { type: Number, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  pec: { type: String, required: true },
  email: {type: String, required:false},
  vat_number: {type: String, required:false},
  taxcode: { type: String, required: true },
  type_of_services: { type: [String], required: true },
});

const Service = mongoose.model('service', serviceSchema);

module.exports = Service;