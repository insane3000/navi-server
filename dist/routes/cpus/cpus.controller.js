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
exports.updateCpu = exports.deleteCpu = exports.getCpu = exports.getCpus = exports.createCpu = void 0;
const cpuSchema_1 = __importDefault(require("./cpuSchema"));
const createCpu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const cpuFound = await Cpu.findOne({ url: req.body.url });
    // if (cpuFound)
    //   return res.status(303).json({ message: "the url already exists" });
    const newCpu = new cpuSchema_1.default(req.body);
    const savedCpu = yield newCpu.save();
    res.json(savedCpu);
});
exports.createCpu = createCpu;
const getCpus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cpus = yield cpuSchema_1.default.find();
        return res.json(cpus);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getCpus = getCpus;
const getCpu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cpuFound = yield cpuSchema_1.default.findById(req.params.id);
    if (!cpuFound)
        return res.status(204).json();
    return res.json(cpuFound);
});
exports.getCpu = getCpu;
const deleteCpu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cpuFound = yield cpuSchema_1.default.findByIdAndDelete(req.params.id);
    if (!cpuFound)
        return res.status(204).json();
    return res.status(204).json();
});
exports.deleteCpu = deleteCpu;
const updateCpu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cpuUpdated = yield cpuSchema_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!cpuUpdated)
        return res.status(204).json();
    return res.json(cpuUpdated);
});
exports.updateCpu = updateCpu;
