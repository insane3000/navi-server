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
exports.updateMotherboard = exports.deleteMotherboard = exports.getMotherboard = exports.getMotherboards = exports.createMotherboard = void 0;
const motherboardSchema_1 = __importDefault(require("./motherboardSchema"));
const createMotherboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const motherboardFound = await Motherboard.findOne({ url: req.body.url });
    // if (motherboardFound)
    //   return res.status(303).json({ message: "the url already exists" });
    const newMotherboard = new motherboardSchema_1.default(req.body);
    const savedMotherboard = yield newMotherboard.save();
    res.json(savedMotherboard);
});
exports.createMotherboard = createMotherboard;
const getMotherboards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const motherboards = yield motherboardSchema_1.default.find();
        return res.json(motherboards);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getMotherboards = getMotherboards;
const getMotherboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const motherboardFound = yield motherboardSchema_1.default.findById(req.params.id);
    if (!motherboardFound)
        return res.status(204).json();
    return res.json(motherboardFound);
});
exports.getMotherboard = getMotherboard;
const deleteMotherboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const motherboardFound = yield motherboardSchema_1.default.findByIdAndDelete(req.params.id);
    if (!motherboardFound)
        return res.status(204).json();
    return res.status(204).json();
});
exports.deleteMotherboard = deleteMotherboard;
const updateMotherboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const motherboardUpdated = yield motherboardSchema_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!motherboardUpdated)
        return res.status(204).json();
    return res.json(motherboardUpdated);
});
exports.updateMotherboard = updateMotherboard;
