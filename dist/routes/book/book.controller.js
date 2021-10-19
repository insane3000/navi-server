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
exports.updateBook = exports.deleteBook = exports.getBook = exports.getBooks = exports.createBook = void 0;
const bookSchema_1 = __importDefault(require("./bookSchema"));
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBook = new bookSchema_1.default(req.body);
    const savedBook = yield newBook.save();
    res.json(savedBook);
});
exports.createBook = createBook;
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield bookSchema_1.default.find();
        return res.json(books);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getBooks = getBooks;
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookFound = yield bookSchema_1.default.findById(req.params.id);
    if (!bookFound)
        return res.status(204).json();
    return res.json(bookFound);
});
exports.getBook = getBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookFound = yield bookSchema_1.default.findByIdAndDelete(req.params.id);
    if (!bookFound)
        return res.status(204).json();
    return res.status(204).json();
});
exports.deleteBook = deleteBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookUpdated = yield bookSchema_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!bookUpdated)
        return res.status(204).json();
    return res.json(bookUpdated);
});
exports.updateBook = updateBook;
