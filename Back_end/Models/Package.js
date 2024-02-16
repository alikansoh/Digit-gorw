import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const { Schema, model } = mongoose;

const PackageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
   
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service",
        autopopulate: true,
      },
    ],
  },
  { timestamps: true }
);

PackageSchema.plugin(autopopulate);

export default model("Package", PackageSchema);
