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
exports.updateCashRegister = exports.deleteCashRegister = exports.getChartsAnual = exports.getReports = exports.getCashRegisterLast = exports.getCashRegister = exports.getServers = exports.getCashRegisters = exports.createCashRegister = void 0;
const cashRegisterSchema_1 = __importDefault(require("./cashRegisterSchema"));
// import dotenv from "dotenv";
// dotenv.config();
const mongoS3Backup = require("node-mongodump-s3");
const bucketName = process.env.AWS_S3_DUMP_BUCKET;
const accessKey = process.env.AWS_ACCESS_KEY_ID;
const accessSecret = process.env.AWS_SECRET_ACCESS_KEY;
const dbConnectionUri = process.env.MONGO_URI;
const backupClient = mongoS3Backup({ bucketName, accessKey, accessSecret });
const createCashRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCashRegister = new cashRegisterSchema_1.default(req.body);
    const savedCashRegister = yield newCashRegister.save();
    res.json(savedCashRegister);
    backupClient
        .backupDatabase({
        uri: dbConnectionUri,
        backupName: "mongoDB" + Date.now(),
        prefix: "backups/",
    })
        .then((response) => {
        console.log("Success response ", response);
    })
        .catch((err) => {
        console.log("error is ", err);
    });
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
//!Servers
const getServers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const servers = yield cashRegisterSchema_1.default.paginate({}, {
            sort: { date: "desc" },
            limit: 120,
        });
        return res.json(servers);
    }
    catch (error) {
        // res.json(movies);
    }
});
exports.getServers = getServers;
const getCashRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cashRegisterFound = yield cashRegisterSchema_1.default.findById(req.params.id);
    if (!cashRegisterFound)
        return res.status(204).json();
    return res.json(cashRegisterFound);
});
exports.getCashRegister = getCashRegister;
// !get Last
const getCashRegisterLast = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cashRegisterFound = yield cashRegisterSchema_1.default.find().limit(1).sort({ $natural: -1 });
    if (!cashRegisterFound)
        return res.status(204).json();
    return res.json(cashRegisterFound);
});
exports.getCashRegisterLast = getCashRegisterLast;
// !get !Last 21 to reports
const getReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page || 1;
    try {
        const reports = yield cashRegisterSchema_1.default.paginate({}, {
            page: page,
            sort: { date: "desc" },
            limit: 21,
        });
        return res.json(reports);
    }
    catch (error) {
        // res.json(movies);
    }
});
exports.getReports = getReports;
// !get !Charts Anual
const getChartsAnual = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cashRegisterFound = yield cashRegisterSchema_1.default.find({});
    // .limit(23)
    // .sort({ $natural: -1 });
    if (!cashRegisterFound)
        return res.status(204).json();
    // console.log(cashRegisterFound);
    return res.json(cashRegisterFound.map((i) => {
        i.dashboard;
        i.sales = [];
        i.expenses = [];
        return i;
    }));
});
exports.getChartsAnual = getChartsAnual;
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
