"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProduct = exports.getProduct = exports.getProducts = exports.createProduct = void 0;
const productsSchema_1 = __importDefault(require("./productsSchema"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const productFound = await Product.findOne({ url: req.body.url });
    // if (productFound)
    //   return res.status(303).json({ message: "the url already exists" });
    const newProduct = new productsSchema_1.default(req.body);
    const savedProduct = yield newProduct.save();
    res.json(savedProduct);
});
exports.createProduct = createProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productsSchema_1.default.find();
        return res.json(products);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productFound = yield productsSchema_1.default.findById(req.params.id);
    if (!productFound)
        return res.status(204).json();
    return res.json(productFound);
});
exports.getProduct = getProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productFound = yield productsSchema_1.default.findByIdAndDelete(req.params.id);
    if (!productFound)
        return res.status(204).json();
    return res.status(204).json();
});
exports.deleteProduct = deleteProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productUpdated = yield productsSchema_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!productUpdated)
        return res.status(204).json();
    return res.json(productUpdated);
});
exports.updateProduct = updateProduct;
