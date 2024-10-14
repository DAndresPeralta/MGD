import Order from "../models/orders.model.js";

export const getAllOrders = async () => {
  console.log("entro a get");

  const result = await Order.find();
  return result;
};

export const getOrderById = async (id) => {
  const result = await Order.findById({ _id: id })
    .populate("client.client")
    .populate("item.product")
    .lean();
  return result;
};

export const createOrder = async (data) => {
  const result = await Order.create(data);
  return result;
};

export const updateOrder = async (id, data) => {
  const result = await Order.updateOne({ _id: id }, data);
  return result;
};

export const deleteOrder = async (id) => {
  const result = await Order.deleteOne({ _id: id });
  return result;
};
