import { Response, RequestHandler } from "express";
import Book from "./bookSchema";

export const createBook: RequestHandler = async (req, res) => {
  const newBook = new Book(req.body);
  const savedBook = await newBook.save();
  res.json(savedBook);
};

export const getBooks: RequestHandler = async (req, res) => {
  try {
    const books = await Book.find();
    return res.json(books);
  } catch (error) {
    res.json(error);
  }
};

export const getBook: RequestHandler = async (req, res) => {
  const bookFound = await Book.findById(req.params.id);

  if (!bookFound) return res.status(204).json();

  return res.json(bookFound);
};

export const deleteBook: RequestHandler = async (req, res) => {
  const bookFound = await Book.findByIdAndDelete(req.params.id);

  if (!bookFound) return res.status(204).json();

  return res.status(204).json();
};

export const updateBook: RequestHandler = async (
  req,
  res
): Promise<Response> => {
  const bookUpdated = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!bookUpdated) return res.status(204).json();
  return res.json(bookUpdated);
};
