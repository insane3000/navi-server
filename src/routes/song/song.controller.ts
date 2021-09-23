import { Response, RequestHandler } from "express";
import Song from "./songSchema";

export const createSong: RequestHandler = async (req, res) => {
  const newSong = new Song(req.body);
  const savedSong = await newSong.save();
  res.json(savedSong);
};

export const getSongs: RequestHandler = async (req, res) => {
  try {
    const songs = await Song.find();
    return res.json(songs);
  } catch (error) {
    res.json(error);
  }
};

export const getSong: RequestHandler = async (req, res) => {
  const songFound = await Song.findById(req.params.id);

  if (!songFound) return res.status(204).json();

  return res.json(songFound);
};

export const deleteSong: RequestHandler = async (req, res) => {
  const songFound = await Song.findByIdAndDelete(req.params.id);

  if (!songFound) return res.status(204).json();

  return res.status(204).json();
};

export const updateSong: RequestHandler = async (
  req,
  res
): Promise<Response> => {
  const songUpdated = await Song.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!songUpdated) return res.status(204).json();
  return res.json(songUpdated);
};
