"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const computerSchema = new mongoose_1.Schema({
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
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("computers", computerSchema);
