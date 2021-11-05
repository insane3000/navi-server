import { Schema, model } from "mongoose";

const computerSchema = new Schema(
  {
    name: String,
    maintenanceDate: String,
    headset: String,
    keyboard: String,
    mouse: String,
    cpu: String,
    ram: String,
    mobo: String,
    power: String,
    gpu: String,
    case: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export default model("computers", computerSchema);
