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
exports.updateCashRegister = exports.deleteCashRegister = exports.getCashRegisterLast = exports.getCashRegister = exports.getCashRegisters = exports.createCashRegister = void 0;
const cashRegisterSchema_1 = __importDefault(require("./cashRegisterSchema"));
const createCashRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const cashRegisterFound = await CashRegister.findOne({ url: req.body.url });
    // if (cashRegisterFound)
    //   return res.status(303).json({ message: "the url already exists" });
    const newCashRegister = new cashRegisterSchema_1.default(req.body);
    const savedCashRegister = yield newCashRegister.save();
    res.json(savedCashRegister);
});
exports.createCashRegister = createCashRegister;
const getCashRegisters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cashRegisters = yield cashRegisterSchema_1.default.find();
        return res.json(cashRegisters);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getCashRegisters = getCashRegisters;
const getCashRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cashRegisterFound = yield cashRegisterSchema_1.default.findById(req.params.id);
    if (!cashRegisterFound)
        return res.status(204).json();
    return res.json(cashRegisterFound);
});
exports.getCashRegister = getCashRegister;
// !get Last
const getCashRegisterLast = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cashRegisterFound = yield cashRegisterSchema_1.default.find()
        .limit(1)
        .sort({ $natural: -1 });
    if (!cashRegisterFound)
        return res.status(204).json();
    return res.json(cashRegisterFound);
});
exports.getCashRegisterLast = getCashRegisterLast;
const deleteCashRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cashRegisterFound = yield cashRegisterSchema_1.default.findByIdAndDelete(req.params.id);
    if (!cashRegisterFound)
        return res.status(204).json();
    return res.status(204).json();
});
exports.deleteCashRegister = deleteCashRegister;
const updateCashRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cashRegisterUpdated = yield cashRegisterSchema_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!cashRegisterUpdated)
        return res.status(204).json();
    return res.json(cashRegisterUpdated);
});
exports.updateCashRegister = updateCashRegister;
