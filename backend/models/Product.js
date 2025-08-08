const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: String,
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 0, min: 0 },
  thumbnail: String,
});

module.exports = mongoose.model("Product", productSchema);
