"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookCtrl = __importStar(require("./book.controller"));
// import { uploadImage } from "./book.controller";
const book_controller_1 = require("./book.controller");
const router = (0, express_1.Router)();
router.get("/book", bookCtrl.getBooks);
router.get("/book/:id", bookCtrl.getBook);
router.post("/book", book_controller_1.upload.single("file"), bookCtrl.createBook);
router.delete("/book/:id", bookCtrl.deleteBook);
router.put("/book/:id", bookCtrl.updateBook);
// !Pruebas
router.get("/genre/:id", bookCtrl.getBooksByGenre);
router.get("/year/:id", bookCtrl.getBooksByYear);
router.get("/movie-search/:id", bookCtrl.getBookSearch);
exports.default = router;
