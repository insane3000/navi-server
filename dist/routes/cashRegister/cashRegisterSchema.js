"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cashRegisterSchema = new mongoose_1.Schema({
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
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("cashRegister", cashRegisterSchema);
