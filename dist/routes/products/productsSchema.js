"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: String,
    cost: Number,
    price: Number,
    previousServer: Number,
    load: Number,
    currentServer: Number,
    sales: Number,
    cash: Number,
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("products", productSchema);
