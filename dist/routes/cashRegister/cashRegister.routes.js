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
const cashRegisterCtrl = __importStar(require("./cashRegister.controller"));
const validateToken_1 = require("../../libs/validateToken");
const router = (0, express_1.Router)();
router.get("/cash-register", validateToken_1.tokenValidation, cashRegisterCtrl.getCashRegisters);
router.get("/cash-register/:id", validateToken_1.tokenValidation, cashRegisterCtrl.getCashRegister);
router.post("/cash-register", validateToken_1.tokenValidation, cashRegisterCtrl.createCashRegister);
router.delete("/cash-register/:id", validateToken_1.tokenValidation, cashRegisterCtrl.deleteCashRegister);
router.put("/cash-register/:id", validateToken_1.tokenValidation, cashRegisterCtrl.updateCashRegister);
// !Last
router.get("/cash-register-one", validateToken_1.tokenValidation, cashRegisterCtrl.getCashRegisterLast);
// !Last 21 to reports
router.get("/reports", validateToken_1.tokenValidation, cashRegisterCtrl.getReports);
// !Charts Anual
router.get("/charts-anual", validateToken_1.tokenValidation, cashRegisterCtrl.getChartsAnual);
// !Servers
router.get("/servers", validateToken_1.tokenValidation, cashRegisterCtrl.getServers);
exports.default = router;
