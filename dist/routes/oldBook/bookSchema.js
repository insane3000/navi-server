"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: String,
    author: String,
    image: String,
    content: String,
    readed: String,
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("book", bookSchema);
