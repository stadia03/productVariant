const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  size: String,
  color: String,
  material: String
});

// const ProductSchema = new mongoose.Schema({
//   name: String,
//   variants: [VariantSchema]
// });

module.exports = mongoose.model('Product', ProductSchema);
