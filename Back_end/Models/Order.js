import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const { Schema, model } = mongoose;

const OrderSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    Total_price: {
      type: Number,
    },

    services: { 
      type: Number,
       required: true 
      },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      autopopulate: true,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },

    orderID: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true }
);

OrderSchema.plugin(autopopulate);

export default model("Order", OrderSchema);
