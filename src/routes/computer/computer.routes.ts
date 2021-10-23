import { Router } from "express";
import * as computerCtrl from "./computer.controller";
import { tokenValidation } from "../../libs/validateToken";
const router = Router();
router.get("/computer", tokenValidation, computerCtrl.getComputers);
router.get("/computer/:id", tokenValidation, computerCtrl.getComputer);
router.post("/computer", tokenValidation, computerCtrl.createComputer);
router.delete("/computer/:id", tokenValidation, computerCtrl.deleteComputer);
router.put("/computer/:id", tokenValidation, computerCtrl.updateComputer);

export default router;
