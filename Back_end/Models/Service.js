import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    service:{
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    our_price: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    dripfeed: {
      type: Boolean,
      required: true,
    },
    profit: {
        type: Number,
      required: true,
    },
    refill: {
      type: Boolean,
      required: true,
    },
    cancel: {
      type: Boolean,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Service", ServiceSchema);
