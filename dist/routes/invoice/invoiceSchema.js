"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const invoiceSchema = new mongoose_1.Schema({
    year: Number,
    month: Number,
    imageS: Array,
    imageM: Array,
}, {
    versionKey: false,
    timestamps: true,
});
invoiceSchema.plugin(mongoose_paginate_v2_1.default);
exports.default = (0, mongoose_1.model)("invoice", invoiceSchema);
