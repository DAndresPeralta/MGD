import mongoose from "mongoose";

const userCollection = "user";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: String,
  email: String,
  role: String,
  password: String,
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
