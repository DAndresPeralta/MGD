import mongoose from "mongoose";

const clientCollection = "client";

const clientSchema = new mongoose.Schema({
  code: String,
  lastName: String,
  firstName: String,
  company: String,
  cuil: Number,
  email: String,
  status: Boolean,
  orders: {
    type: [
      {
        order: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
      },
    ],
    default: [],
  },
});

const clientModel = mongoose.model(clientCollection, clientSchema);

export default clientModel;
