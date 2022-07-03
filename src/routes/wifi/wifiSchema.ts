import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const wifiSchema = new Schema(
  {
    network: { type: String, trim: true },
    password: { type: String, trim: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
wifiSchema.plugin(mongoosePaginate);

export default model("wifi", wifiSchema);
