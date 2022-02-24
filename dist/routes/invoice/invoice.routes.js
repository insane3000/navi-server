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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const invoiceCtrl = __importStar(require("./invoice.controller"));
// import { tokenValidation } from "../../libs/validateToken";
// import { expireValidation } from "../../libs/validateExpireCode";
const uploadLocal_1 = require("../../libs/uploadLocal");
const multer_1 = __importDefault(require("multer"));
const validateToken_1 = require("../../libs/validateToken");
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
// const update = multer({ storage: multer.memoryStorage() });
const router = (0, express_1.Router)();
// !Action Admin
router.post("/invoice", upload.array("files"), uploadLocal_1.uploadLocal, invoiceCtrl.createInvoice);
router.delete("/invoice/:id", validateToken_1.tokenValidation, invoiceCtrl.deleteInvoice);
// !Rutas Client
router.get("/invoice", validateToken_1.tokenValidation, invoiceCtrl.getInvoices);
router.get("/invoice/:id", validateToken_1.tokenValidation, invoiceCtrl.getInvoice);
exports.default = router;
