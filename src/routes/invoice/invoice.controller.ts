import { Response, RequestHandler } from "express";
import Invoice from "./invoiceSchema";
import fs from "fs";
import path from "path";
// !Crear Mobo
export const createInvoice: RequestHandler = async (req: any, res) => {
  let newInvoice = new Invoice(req.body);
  const savedInvoice = await newInvoice.save();
  console.log("Saved movie");
  res.json(savedInvoice);
};

// ! Get todas las facturas
export const getInvoices: RequestHandler = async (req: any, res) => {
  const year = req.query.year || 2022;
  console.log(req.query);
  try {
    const movies = await Invoice.paginate(
      {
        year: year,
      },
      {
        sort: { month: "asc" },
      }
    );

    return res.json(movies);
    //     console.log(movies.docs);
  } catch (error) {
    // res.json(movies);
  }
};
// //! Get movie for ID
export const getInvoice: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Invoice.findById(id);
    return res.json(data);
  } catch (error) {
    return res.status(204).json();
  }
};
//! Delete invoice
export const deleteInvoice: RequestHandler = async (req, res) => {
  const movieFound: any = await Invoice.findByIdAndDelete(req.params.id);
  const pathDelete = path.join(__dirname, "../../../public/invoices/");
  if (!movieFound) return res.status(204).json();
  // !Delete previous image
  try {
    for (let index = 0; index < movieFound.imageS.length; index++) {
      fs.unlinkSync(`${pathDelete}${movieFound.imageS[index]}`);
      console.log("File S deleted!");
    }
  } catch (err) {
    console.error(err);
  }
  try {
    for (let index = 0; index < movieFound.imageS.length; index++) {
      fs.unlinkSync(`${pathDelete}${movieFound.imageM[index]}`);
      console.log("File M deleted!");
    }
  } catch (err) {
    console.error(err);
  }

  return res.status(204).json();
};
