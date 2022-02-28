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
exports.deleteInvoice = exports.getInvoice = exports.getInvoices = exports.createInvoice = void 0;
const invoiceSchema_1 = __importDefault(require("./invoiceSchema"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// !Crear Mobo
const createInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newInvoice = new invoiceSchema_1.default(req.body);
    const savedInvoice = yield newInvoice.save();
    console.log("Saved movie");
    res.json(savedInvoice);
});
exports.createInvoice = createInvoice;
// ! Get todas las facturas
const getInvoices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const year = req.query.year || new Date().getFullYear();
    //   console.log(req.query);
    try {
        const movies = yield invoiceSchema_1.default.paginate({
            year: year,
        }, {
            sort: { month: "asc" },
        });
        return res.json(movies);
        //     console.log(movies.docs);
    }
    catch (error) {
        // res.json(movies);
    }
});
exports.getInvoices = getInvoices;
// //! Get movie for ID
const getInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const data = yield invoiceSchema_1.default.findById(id);
        return res.json(data);
    }
    catch (error) {
        return res.status(204).json();
    }
});
exports.getInvoice = getInvoice;
//! Delete invoice
const deleteInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movieFound = yield invoiceSchema_1.default.findByIdAndDelete(req.params.id);
    const pathDelete = path_1.default.join(__dirname, "../../../public/invoices/");
    if (!movieFound)
        return res.status(204).json();
    // !Delete previous image
    try {
        for (let index = 0; index < movieFound.imageS.length; index++) {
            fs_1.default.unlinkSync(`${pathDelete}${movieFound.imageS[index]}`);
            console.log("File S deleted!");
        }
    }
    catch (err) {
        console.error(err);
    }
    try {
        for (let index = 0; index < movieFound.imageS.length; index++) {
            fs_1.default.unlinkSync(`${pathDelete}${movieFound.imageM[index]}`);
            console.log("File M deleted!");
        }
    }
    catch (err) {
        console.error(err);
    }
    return res.status(204).json();
});
exports.deleteInvoice = deleteInvoice;
