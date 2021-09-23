import { Schema, model } from "mongoose";

const motherboardsSchema = new Schema(
  {
    title: {
      type: String,
      // required: true,
      trim: true,
    },
    img: String,
    price: Number,
    name: String,

  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export default model("motherboards", motherboardsSchema);
