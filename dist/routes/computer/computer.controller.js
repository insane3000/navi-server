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
exports.updateComputer = exports.deleteComputer = exports.getComputer = exports.getComputers = exports.createComputer = void 0;
const computerSchema_1 = __importDefault(require("./computerSchema"));
const createComputer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newComputer = new computerSchema_1.default(req.body);
    const savedComputer = yield newComputer.save();
    res.json(savedComputer);
});
exports.createComputer = createComputer;
const getComputers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const computers = yield computerSchema_1.default.find();
        return res.json(computers);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getComputers = getComputers;
const getComputer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const computerFound = yield computerSchema_1.default.findById(req.params.id);
    if (!computerFound)
        return res.status(204).json();
    return res.json(computerFound);
});
exports.getComputer = getComputer;
const deleteComputer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const computerFound = yield computerSchema_1.default.findByIdAndDelete(req.params.id);
    if (!computerFound)
        return res.status(204).json();
    return res.status(204).json();
});
exports.deleteComputer = deleteComputer;
const updateComputer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const computerUpdated = yield computerSchema_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!computerUpdated)
        return res.status(204).json();
    return res.json(computerUpdated);
});
exports.updateComputer = updateComputer;
