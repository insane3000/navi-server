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
exports.updateWifi = exports.getWifi = void 0;
const wifiSchema_1 = __importDefault(require("./wifiSchema"));
// import fs from "fs";
// import path from "path";
// // !Crear Wifi
// export const createInvoice: RequestHandler = async (req: any, res) => {
//   let newInvoice = new wifi(req.body);
//   const savedInvoice = await newInvoice.save();
//   console.log("Saved movie");
//   res.json(savedInvoice);
// };
// ! Get todas las redes
// export const getInvoices: RequestHandler = async (req: any, res) => {
//   const year = req.query.year || new Date().getFullYear();
//   //   console.log(req.query);
//   try {
//     const movies = await wifi.paginate(
//       {
//         year: year,
//       },
//       {
//         sort: { month: "asc" },
//       }
//     );
//     return res.json(movies);
//     //     console.log(movies.docs);
//   } catch (error) {
//     // res.json(movies);
//   }
// };
//! Get  for ID
const getWifi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const data = yield wifiSchema_1.default.findById(id);
        return res.json(data);
    }
    catch (error) {
        return res.status(204).json();
    }
});
exports.getWifi = getWifi;
//! Update  for ID
const updateWifi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wifiUpdated = yield wifiSchema_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!wifiUpdated)
        return res.status(204).json();
    return res.json(wifiUpdated);
});
exports.updateWifi = updateWifi;
//! Delete wifi
// export const deleteInvoice: RequestHandler = async (req, res) => {
//   const movieFound: any = await wifi.findByIdAndDelete(req.params.id);
//   const pathDelete = path.join(__dirname, "../../../public/invoices/");
//   if (!movieFound) return res.status(204).json();
//   // !Delete previous image
//   try {
//     for (let index = 0; index < movieFound.imageS.length; index++) {
//       fs.unlinkSync(`${pathDelete}${movieFound.imageS[index]}`);
//       console.log("File S deleted!");
//     }
//   } catch (err) {
//     console.error(err);
//   }
//   try {
//     for (let index = 0; index < movieFound.imageS.length; index++) {
//       fs.unlinkSync(`${pathDelete}${movieFound.imageM[index]}`);
//       console.log("File M deleted!");
//     }
//   } catch (err) {
//     console.error(err);
//   }
//   return res.status(204).json();
// };
