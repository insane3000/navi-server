import { Response, RequestHandler } from "express";
import CashRegister from "./cashRegisterSchema";
// import dotenv from "dotenv";
// dotenv.config();

const mongoS3Backup = require("node-mongodump-s3");

const bucketName = process.env.AWS_S3_DUMP_BUCKET;
const accessKey = process.env.AWS_ACCESS_KEY_ID;
const accessSecret = process.env.AWS_SECRET_ACCESS_KEY;
const dbConnectionUri = process.env.MONGO_URI;

const backupClient = mongoS3Backup({ bucketName, accessKey, accessSecret });

export const createCashRegister: RequestHandler = async (req, res) => {
  const newCashRegister = new CashRegister(req.body);
  const savedCashRegister = await newCashRegister.save();
  res.json(savedCashRegister);
  
  backupClient
    .backupDatabase({
      uri: dbConnectionUri,
      backupName: "mongoDB" + Date.now(),
      prefix: "backups/",
    })
    .then((response: any) => {
      console.log("Success response ", response);
     })
    .catch((err: any) => {
      console.log("error is ", err);
    });
};

export const getCashRegisters: RequestHandler = async (req, res) => {
  try {
    const cashRegisters = await CashRegister.find();
    return res.json(cashRegisters);
  } catch (error) {
    res.json(error);
  }
};

export const getCashRegister: RequestHandler = async (req, res) => {
  const cashRegisterFound = await CashRegister.findById(req.params.id);

  if (!cashRegisterFound) return res.status(204).json();

  return res.json(cashRegisterFound);
};
// !get Last
export const getCashRegisterLast: RequestHandler = async (req, res) => {
  const cashRegisterFound = await CashRegister.find()
    .limit(1)
    .sort({ $natural: -1 });

  if (!cashRegisterFound) return res.status(204).json();

  return res.json(cashRegisterFound);
};

export const deleteCashRegister: RequestHandler = async (req, res) => {
  const cashRegisterFound = await CashRegister.findByIdAndDelete(req.params.id);

  if (!cashRegisterFound) return res.status(204).json();

  return res.status(204).json();
};

export const updateCashRegister: RequestHandler = async (
  req,
  res
): Promise<Response> => {
  const cashRegisterUpdated = await CashRegister.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  if (!cashRegisterUpdated) return res.status(204).json();
  return res.json(cashRegisterUpdated);
};
