import mongoose from "mongoose";

const orderCollection = "order";

const orderSchema = new mongoose.Schema({
  item: {
    type: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
        quantity: Number,
      },
    ],
    default: [],
  },
  status: String,
  pay: String,
});

const orderModel = mongoose.model(orderCollection, orderSchema);

export default orderModel;
