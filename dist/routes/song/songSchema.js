"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const songSchema = new mongoose_1.Schema({
    bandName: String,
    songName: String,
    releaseYear: String,
    titleEnglish: String,
    titleSpanish: String,
    englishLyrics: String,
    spanishLyrics: String,
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("songs", songSchema);
