import { Response, RequestHandler } from "express";
import wifi from "./wifiSchema";
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
export const getWifi: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await wifi.findById(id);
    return res.json(data);
  } catch (error) {
    return res.status(204).json();
  }
};
//! Update  for ID
export const updateWifi: RequestHandler = async (req, res): Promise<Response> => {
  const wifiUpdated = await wifi.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!wifiUpdated) return res.status(204).json();
  return res.json(wifiUpdated);
};

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
