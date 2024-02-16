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
   
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service",
        autopopulate: true,
      },
    ],
    packages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Package",
        autopopulate: true,
      }
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      autopopulate: true,
      required: true,
    },
  },
  { timestamps: true }
);

OrderSchema.plugin(autopopulate);

export default model("Order", OrderSchema);
