import { Response, RequestHandler } from "express";
import Product from "./productsSchema";

export const createProduct: RequestHandler = async (req, res) => {
  // const productFound = await Product.findOne({ url: req.body.url });
  // if (productFound)
  //   return res.status(303).json({ message: "the url already exists" });

  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.json(savedProduct);
};

export const getProducts: RequestHandler = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    res.json(error);
  }
};

export const getProduct: RequestHandler = async (req, res) => {
  const productFound = await Product.findById(req.params.id);

  if (!productFound) return res.status(204).json();

  return res.json(productFound);
};

export const deleteProduct: RequestHandler = async (req, res) => {
  const productFound = await Product.findByIdAndDelete(req.params.id);

  if (!productFound) return res.status(204).json();

  return res.status(204).json();
};

export const updateProduct: RequestHandler = async (
  req,
  res
): Promise<Response> => {
  const productUpdated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  if (!productUpdated) return res.status(204).json();
  return res.json(productUpdated);
};
