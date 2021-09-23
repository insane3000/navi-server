import { Router } from "express";
import * as motherboardCtrl from "./motherboards.controller";

const router = Router();
router.get("/motherboard", motherboardCtrl.getMotherboards);
router.get("/motherboard/:id", motherboardCtrl.getMotherboard);
router.post("/motherboard", motherboardCtrl.createMotherboard);
router.delete("/motherboard/:id", motherboardCtrl.deleteMotherboard);
router.put("/motherboard/:id", motherboardCtrl.updateMotherboard);

export default router;
