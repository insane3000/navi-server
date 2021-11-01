import { Router } from "express";
import * as bookCtrl from "./book.controller";
// import { uploadImage } from "./book.controller";
import { upload } from "./book.controller";

const router = Router();
router.get("/book", bookCtrl.getBooks);
router.get("/book/:id", bookCtrl.getBook);
router.post("/book", upload.single("file"), bookCtrl.createBook);
router.delete("/book/:id", bookCtrl.deleteBook);
router.put("/book/:id", bookCtrl.updateBook);
// !Pruebas
router.get("/genre/:id", bookCtrl.getBooksByGenre);
router.get("/year/:id", bookCtrl.getBooksByYear);
router.get("/movie-search/:id", bookCtrl.getBookSearch);

export default router;
