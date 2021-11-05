"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("./config"));
const cors_1 = __importDefault(require("cors"));
const products_routes_1 = __importDefault(require("./routes/products/products.routes"));
const cashRegister_routes_1 = __importDefault(require("./routes/cashRegister/cashRegister.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth/auth.routes"));
const computer_routes_1 = __importDefault(require("./routes/computer/computer.routes"));
// import dotenv from "dotenv";
// dotenv.config();
var clientURI = {
    origin: [
        "http://localhost:3000",
        "http://192.168.0.148:3000",
        "https://navigamescbba.com",
        "https://dtid09x3ren7e.cloudfront.net",
        "http://shoke.cc.s3-website-sa-east-1.amazonaws.com",
    ],
};
const app = (0, express_1.default)();
app.set("port", config_1.default.PORT);
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)(clientURI));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(products_routes_1.default);
app.use(cashRegister_routes_1.default);
app.use(auth_routes_1.default);
app.use(computer_routes_1.default);
exports.default = app;
