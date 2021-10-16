import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: String,
    cost: Number,
    price: Number,
    previousServer: Number,
    load: Number,
    currentServer: Number,
    sales: Number,
    cash: Number,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export default model("products", productSchema);
