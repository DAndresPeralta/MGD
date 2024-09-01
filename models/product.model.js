import mongoose from "mongoose";

const productCollection = "product";

const productSchema = new mongoose.Schema({
  code: Number,
  product: String,
  brand: String,
  weight: Number,
  stock: Number,
  role: Boolean,
  obs: String,
});

const productModel = mongoose.model(productCollection, productSchema);

export default productModel;
