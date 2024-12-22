import Product from "../models/product.model.js";

export const getAllProducts = async () => {
  const result = await Product.find();
  return result;
};

export const getProductById = async (id) => {
  const result = await Product.findById({ _id: id });
  return result;
};

export const getProductByCode = async (code) => {
  const result = await Product.findOne({ code: code });
  return result;
};

export const createProduct = async (product) => {
  const result = await Product.create(product);
  return result;
};

export const updateProduct = async (id, product) => {
  const result = await Product.updateOne({ _id: id }, product);
  return result;
};

export const updateStockProduct = async (id, stock) => {
  const result = await Product.updateOne({ _id: id }, { $set: { stock } });
  return result;
};

export const deleteProduct = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};
