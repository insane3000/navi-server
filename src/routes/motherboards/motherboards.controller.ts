import { Response, RequestHandler } from "express";
import Motherboard from "./motherboardSchema";

export const createMotherboard: RequestHandler = async (req, res) => {
  // const motherboardFound = await Motherboard.findOne({ url: req.body.url });
  // if (motherboardFound)
  //   return res.status(303).json({ message: "the url already exists" });

  const newMotherboard = new Motherboard(req.body);
  const savedMotherboard = await newMotherboard.save();
  res.json(savedMotherboard);
};

export const getMotherboards: RequestHandler = async (req, res) => {
  try {
    const motherboards = await Motherboard.find();
    return res.json(motherboards);
  } catch (error) {
    res.json(error);
  }
};

export const getMotherboard: RequestHandler = async (req, res) => {
  const motherboardFound = await Motherboard.findById(req.params.id);

  if (!motherboardFound) return res.status(204).json();

  return res.json(motherboardFound);
};

export const deleteMotherboard: RequestHandler = async (req, res) => {
  const motherboardFound = await Motherboard.findByIdAndDelete(req.params.id);

  if (!motherboardFound) return res.status(204).json();

  return res.status(204).json();
};

export const updateMotherboard: RequestHandler = async (
  req,
  res
): Promise<Response> => {
  const motherboardUpdated = await Motherboard.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  if (!motherboardUpdated) return res.status(204).json();
  return res.json(motherboardUpdated);
};
