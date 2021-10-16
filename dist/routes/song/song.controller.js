"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSong = exports.deleteSong = exports.getSong = exports.getSongs = exports.createSong = void 0;
const songSchema_1 = __importDefault(require("./songSchema"));
const createSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newSong = new songSchema_1.default(req.body);
    const savedSong = yield newSong.save();
    res.json(savedSong);
});
exports.createSong = createSong;
const getSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songs = yield songSchema_1.default.find();
        return res.json(songs);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getSongs = getSongs;
const getSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songFound = yield songSchema_1.default.findById(req.params.id);
    if (!songFound)
        return res.status(204).json();
    return res.json(songFound);
});
exports.getSong = getSong;
const deleteSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songFound = yield songSchema_1.default.findByIdAndDelete(req.params.id);
    if (!songFound)
        return res.status(204).json();
    return res.status(204).json();
});
exports.deleteSong = deleteSong;
const updateSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songUpdated = yield songSchema_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!songUpdated)
        return res.status(204).json();
    return res.json(songUpdated);
});
exports.updateSong = updateSong;
