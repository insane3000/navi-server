import { Response, RequestHandler } from "express";
import Cpu from "./cpuSchema";

export const createCpu: RequestHandler = async (req, res) => {
  // const cpuFound = await Cpu.findOne({ url: req.body.url });
  // if (cpuFound)
  //   return res.status(303).json({ message: "the url already exists" });

  const newCpu = new Cpu(req.body);
  const savedCpu = await newCpu.save();
  res.json(savedCpu);
};

export const getCpus: RequestHandler = async (req, res) => {
  try {
    const cpus = await Cpu.find();
    return res.json(cpus);
  } catch (error) {
    res.json(error);
  }
};

export const getCpu: RequestHandler = async (req, res) => {
  const cpuFound = await Cpu.findById(req.params.id);

  if (!cpuFound) return res.status(204).json();

  return res.json(cpuFound);
};

export const deleteCpu: RequestHandler = async (req, res) => {
  const cpuFound = await Cpu.findByIdAndDelete(req.params.id);

  if (!cpuFound) return res.status(204).json();

  return res.status(204).json();
};

export const updateCpu: RequestHandler = async (
  req,
  res
): Promise<Response> => {
  const cpuUpdated = await Cpu.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!cpuUpdated) return res.status(204).json();
  return res.json(cpuUpdated);
};
