import { Router } from "express";
import * as invoiceCtrl from "./invoice.controller";
// import { tokenValidation } from "../../libs/validateToken";
// import { expireValidation } from "../../libs/validateExpireCode";
import { uploadLocal } from "../../libs/uploadLocal";
import { updateLocal } from "../../libs/updateLocal";
import multer from "multer";
import { tokenValidation } from "../../libs/validateToken";

const upload = multer({ storage: multer.memoryStorage() });
// const update = multer({ storage: multer.memoryStorage() });
const router = Router();

// !Action Admin
router.post("/invoice", upload.array("files"), uploadLocal, invoiceCtrl.createInvoice);
router.delete("/invoice/:id", tokenValidation, invoiceCtrl.deleteInvoice);
// !Rutas Client
router.get("/invoice", tokenValidation, invoiceCtrl.getInvoices);
router.get("/invoice/:id", tokenValidation, invoiceCtrl.getInvoice);

export default router;
