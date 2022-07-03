"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const wifiSchema = new mongoose_1.Schema({
    network: { type: String, trim: true },
    password: { type: String, trim: true },
}, {
    versionKey: false,
    timestamps: true,
});
wifiSchema.plugin(mongoose_paginate_v2_1.default);
exports.default = (0, mongoose_1.model)("wifi", wifiSchema);
