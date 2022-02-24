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
exports.updateLocal = void 0;
const sharp_1 = __importDefault(require("sharp"));
// import S3 from "aws-sdk/clients/s3";
const crypto_1 = require("crypto");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const updateLocal = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    function removeNonAplhaNumeric(str) {
        return str.replace(/[\W_]/g, "");
    }
    // !Data and name
    //   let prename = req.body.title.split(".").join("").split(",").join("").trim();
    //   let name = prename.split(".")[0].split(" ").join("-").split(":").join("").toLowerCase();
    let name = removeNonAplhaNumeric(req.body.title);
    console.log(name);
    let random = (0, crypto_1.randomBytes)(6).toString("hex");
    // let nameXL = `${name}-xl-${random}.webp`;
    let nameL = `${name}-l-${random}.webp`;
    let nameM = `${name}-m-${random}.webp`;
    let nameS = `${name}-s-${random}.webp`;
    const pathDelete = path_1.default.join(__dirname, "../../public/posters/");
    // !Accion si existe file
    if (req.file) {
        // !Delete previous image
        try {
            fs_1.default.unlinkSync(`${pathDelete}${req.body.imageL}`);
            console.log("File L deleted!");
        }
        catch (err) {
            console.error(err);
        }
        try {
            fs_1.default.unlinkSync(`${pathDelete}${req.body.imageM}`);
            console.log("File M deleted!");
        }
        catch (err) {
            console.error(err);
        }
        try {
            fs_1.default.unlinkSync(`${pathDelete}${req.body.imageS}`);
            console.log("File S deleted!");
        }
        catch (err) {
            console.error(err);
        }
        // !Resize whit sharp
        (0, sharp_1.default)(req.file.buffer)
            .resize(384)
            .webp()
            .toFile(`${pathDelete}${nameL}`, (err, info) => {
            info ? console.log('"Image L uploaded!"') : console.log(err);
        });
        (0, sharp_1.default)(req.file.buffer)
            .resize(240)
            .webp()
            .toFile(`${pathDelete}${nameM}`, (err, info) => {
            info ? console.log('"Image M uploaded!"') : console.log(err);
        });
        (0, sharp_1.default)(req.file.buffer)
            .resize(100)
            .webp()
            .toFile(`${pathDelete}${nameS}`, (err, info) => {
            info ? console.log('"Image S uploaded!"') : console.log(err);
        });
        // !Set new name in body request
        req.body.imageXL = "";
        req.body.imageL = nameL;
        req.body.imageM = nameM;
        req.body.imageS = nameS;
        next();
    }
    else {
        next();
    }
});
exports.updateLocal = updateLocal;
