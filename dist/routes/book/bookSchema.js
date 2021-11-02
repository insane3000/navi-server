"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: String,
    titleEsp: String,
    rating: Number,
    year: String,
    genre: String,
    time: String,
    actors: String,
    synopsis: String,
    link: String,
    image: String,
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("book", bookSchema);
