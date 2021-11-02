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
exports.updateBook = exports.deleteBook = exports.getBook = exports.getBooks = exports.createBook = exports.upload = void 0;
const bookSchema_1 = __importDefault(require("./bookSchema"));
const bucketName = process.env.AWS_S3_DUMP_BUCKET;
const accessKey = process.env.AWS_ACCESS_KEY_ID;
const accessSecret = process.env.AWS_SECRET_ACCESS_KEY;
// const dbConnectionUri = process.env.MONGO_URI;
// !New
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
let s3 = new aws_sdk_1.default.S3({
    accessKeyId: accessKey,
    secretAccessKey: accessSecret,
});
exports.upload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3,
        bucket: "media-files-navi/posters",
        acl: "public-read",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            const ext = file.mimetype.split("/")[1];
            cb(null, Date.now().toString() + "." + ext);
        },
    }),
});
// ! SemiOld
// import multer from "multer";
// export const upload = multer({ dest: "uploads/" });
//! Old
// import multer from "multer";
// const multerConfig = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "public/");
//   },
//   filename: (req, file, callback) => {
//     const ext = file.mimetype.split("/")[1];
//     callback(null, `image-${Date.now()}.${ext}`);
//   },
// });
// const isImage = (req: any, file: any, callback: any) => {
//   if (file.mimetype.startsWith("image")) {
//     callback(null, true);
//   } else {
//     callback(new Error("Only Image is Allowed..."));
//   }
// };
// const upload = multer({
//   storage: multerConfig,
//   fileFilter: isImage,
// });
// export const uploadImage = upload.single("file");
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // console.log(req.file);
    // console.log(req.body.title);
    let newBook = new bookSchema_1.default({
        title: req.body.title,
        image: (_a = req.file) === null || _a === void 0 ? void 0 : _a.location,
    });
    console.log((_b = req.file) === null || _b === void 0 ? void 0 : _b.location);
    // const newBook = new Book(req.body);
    const savedBook = yield newBook.save();
    res.json(savedBook);
    // res.json("positivo");
});
exports.createBook = createBook;
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield bookSchema_1.default.find();
        return res.json(books);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getBooks = getBooks;
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookFound = yield bookSchema_1.default.findById(req.params.id);
    if (!bookFound)
        return res.status(204).json();
    return res.json(bookFound);
});
exports.getBook = getBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookFound = yield bookSchema_1.default.findByIdAndDelete(req.params.id);
    if (!bookFound)
        return res.status(204).json();
    return res.status(204).json();
});
exports.deleteBook = deleteBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookUpdated = yield bookSchema_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!bookUpdated)
        return res.status(204).json();
    return res.json(bookUpdated);
});
exports.updateBook = updateBook;
