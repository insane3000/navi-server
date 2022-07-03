import { Router } from "express";
import * as wifiCtrl from "./wifi.controller";
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
// router.post("/wifi", tokenValidation, wifiCtrl.createInvoice);
// router.delete("/wifi/:id", tokenValidation, wifiCtrl.deleteInvoice);
// !Rutas Client
// router.get("/wifi", tokenValidation, wifiCtrl.getInvoices);
router.get("/wifi/:id", wifiCtrl.getWifi);
router.put("/wifi/:id", tokenValidation, wifiCtrl.updateWifi);

export default router;
