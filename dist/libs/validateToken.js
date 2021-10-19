"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenValidation = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
        return res.status(401).json("Access denied");
    jsonwebtoken_1.default.verify(token, "insane3000", (err) => {
        if (err)
            return res.sendStatus(403);
        req.body._id = req.headers["id"];
        next();
    });
};
exports.tokenValidation = tokenValidation;
