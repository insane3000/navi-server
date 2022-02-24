"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
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
cashRegisterSchema.plugin(mongoose_paginate_v2_1.default);
exports.default = (0, mongoose_1.model)("cashRegister", cashRegisterSchema);
