import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const invoiceSchema = new Schema(
  {
    year: Number,
    month: Number,
    imageS: Array,
    imageM: Array,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
invoiceSchema.plugin(mongoosePaginate);

export default model("invoice", invoiceSchema);
