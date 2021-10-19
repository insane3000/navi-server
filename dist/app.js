"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("./config"));
const cors_1 = __importDefault(require("cors"));
const motherboards_routes_1 = __importDefault(require("./routes/motherboards/motherboards.routes"));
const cpus_routes_1 = __importDefault(require("./routes/cpus/cpus.routes"));
const song_routes_1 = __importDefault(require("./routes/song/song.routes"));
const book_routes_1 = __importDefault(require("./routes/book/book.routes"));
const products_routes_1 = __importDefault(require("./routes/products/products.routes"));
const cashRegister_routes_1 = __importDefault(require("./routes/cashRegister/cashRegister.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth/auth.routes"));
// import dotenv from "dotenv";
// dotenv.config();
var clientURI = {
    origin: [
        // "http://192.168.0.148:3000",
        "http://18.230.170.233:3000",
        // "http://localhost:3000",
        "https://navigamescbba.com",
    ],
};
const app = (0, express_1.default)();
app.set("port", config_1.default.PORT);
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)(clientURI));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(motherboards_routes_1.default);
app.use(cpus_routes_1.default);
app.use(song_routes_1.default);
app.use(book_routes_1.default);
app.use(products_routes_1.default);
app.use(cashRegister_routes_1.default);
app.use(auth_routes_1.default);
exports.default = app;
