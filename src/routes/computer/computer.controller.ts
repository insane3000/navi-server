import { Response, RequestHandler } from "express";
import Computer from "./computerSchema";

export const createComputer: RequestHandler = async (req, res) => {
  const newComputer = new Computer(req.body);
  const savedComputer = await newComputer.save();
  res.json(savedComputer);
};

export const getComputers: RequestHandler = async (req, res) => {
  try {
    const computers = await Computer.find();
    return res.json(computers);
  } catch (error) {
    res.json(error);
  }
};

export const getComputer: RequestHandler = async (req, res) => {
  const computerFound = await Computer.findById(req.params.id);

  if (!computerFound) return res.status(204).json();

  return res.json(computerFound);
};

export const deleteComputer: RequestHandler = async (req, res) => {
  const computerFound = await Computer.findByIdAndDelete(req.params.id);

  if (!computerFound) return res.status(204).json();

  return res.status(204).json();
};

export const updateComputer: RequestHandler = async (
  req,
  res
): Promise<Response> => {
  const computerUpdated = await Computer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!computerUpdated) return res.status(204).json();
  return res.json(computerUpdated);
};
