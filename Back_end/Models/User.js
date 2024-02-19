import mongoose from "mongoose";
import bcrypt from "bcrypt";
const UserSchema = new mongoose.Schema(
  {
   
    password: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,

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
UserSchema.methods.isValidPassword = async function(candidatePassword) {
  try {
      return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
      throw new Error(error);
  }
};

export default mongoose.model("User", UserSchema);
