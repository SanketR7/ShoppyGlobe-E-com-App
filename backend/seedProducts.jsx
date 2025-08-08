const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("../models/Product");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany({});
  await Product.insertMany([
    { name: "Laptop", description: "Fast laptop", price: 60000, stock: 5 },
    { name: "Phone", description: "Smartphone", price: 25000, stock: 10 },
  ]);
  console.log("Seeded products");
  mongoose.disconnect();
}
seed();
