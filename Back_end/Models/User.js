import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
    },
    googleId: { type: String, 
    required: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
