import { Router } from "express";
import * as authCtrl from "./auth.controller";
import { tokenValidation } from "../../libs/validateToken";

const router = Router();
router.post("/signup", authCtrl.signup);
router.post("/login", authCtrl.login);
router.get("/profile/:id", authCtrl.profile);
router.put("/profile/:id", authCtrl.updateProfile);

export default router;
