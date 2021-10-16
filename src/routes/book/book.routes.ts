import { Router } from "express";
import * as bookCtrl from "./book.controller";

const router = Router();
router.get("/book", bookCtrl.getBooks);
router.get("/book/:id", bookCtrl.getBook);
router.post("/book", bookCtrl.createBook);
router.delete("/book/:id", bookCtrl.deleteBook);
router.put("/book/:id", bookCtrl.updateBook);

export default router;
