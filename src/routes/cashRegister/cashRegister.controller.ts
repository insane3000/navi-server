import { Response, RequestHandler } from "express";
import CashRegister from "./cashRegisterSchema";

export const createCashRegister: RequestHandler = async (req, res) => {
  // const cashRegisterFound = await CashRegister.findOne({ url: req.body.url });
  // if (cashRegisterFound)
  //   return res.status(303).json({ message: "the url already exists" });

  const newCashRegister = new CashRegister(req.body);
  const savedCashRegister = await newCashRegister.save();
  res.json(savedCashRegister);
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
