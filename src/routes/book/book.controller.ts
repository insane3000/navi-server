import { Response, RequestHandler } from "express";
import Book from "./bookSchema";
import express from "express";
const bucketName = process.env.AWS_S3_DUMP_BUCKET;
const accessKey = process.env.AWS_ACCESS_KEY_ID;
const accessSecret = process.env.AWS_SECRET_ACCESS_KEY;
// const dbConnectionUri = process.env.MONGO_URI;
// !New
import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
let s3 = new aws.S3({
  accessKeyId: accessKey,
  secretAccessKey: accessSecret,
});

export let upload = multer({
  storage: multerS3({
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

export const createBook: RequestHandler = async (req: any, res) => {
  // console.log(req.file);
  // console.log(req.body.title);
  let newBook = new Book({
    title: req.body.title,
    titleEsp: req.body.titleEsp,
    rating: req.body.rating,
    year: req.body.year,
    genre: req.body.genre,
    time: req.body.time,
    actors: req.body.actors,
    synopsis: req.body.synopsis,
    link: req.body.link,
    image: req.file?.location,
  });
  console.log(newBook);
  // const newBook = new Book(req.body);
  const savedBook = await newBook.save();
  res.json(savedBook);
  // res.json("positivo");
};

export const getBooks: RequestHandler = async (req, res) => {
  try {
    const books = await Book.find();
    return res.json(books);
  } catch (error) {
    res.json(error);
  }
};
// !Pruebas by Gener
export const getBooksByGenre: RequestHandler = async (req, res) => {
  try {
    const books = await Book.find({
      genre: { $regex: `${req.params.id}*`, $options: "i" },
    });
    // const books = await Book.find({"year": req.params.id});
    return res.json(books);
  } catch (error) {
    res.json(error);
  }
};
// !Pruebas Search
export const getBookSearch: RequestHandler = async (req, res) => {
  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: `${req.params.id}*`, $options: "i" } },
        { titleEsp: { $regex: `${req.params.id}*`, $options: "i" } },
      ],
    });

    return res.json(books);
  } catch (error) {
    res.json(error);
  }
};
// !Pruebas y Year
export const getBooksByYear: RequestHandler = async (req, res) => {
  try {
    // const books = await Book.find({"genre": /.*animaci*/i});
    const books = await Book.find({ year: req.params.id });
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
