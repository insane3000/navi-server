import { Schema, model } from "mongoose";

const cashRegisterSchema = new Schema(
  {
    lastRecord: String,
    login: String,
    date: String,
    dashboard: {
      // _id: String,
      date: String,
      server: String,
      totalSales: Number,
      totalExpenses: Number,
      pancafe: Number,
      totalCash: Number,
      balance: Number,
    },
    sales: [
      {
        // _id: String,
        name: String,
        cost: Number,
        price: Number,
        previousServer: Number,
        load: Number,
        currentServer: Number,
        sales: Number,
        profit: Number,
        cash: Number,
      },
    ],
    expenses: [
      {
        // _id: String,
        name: String,
        detail: String,
        expense: Number,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export default model("cashRegister", cashRegisterSchema);
