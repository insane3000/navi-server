import { Router } from "express";
import * as songCtrl from "./song.controller";

const router = Router();
router.get("/song", songCtrl.getSongs);
router.get("/song/:id", songCtrl.getSong);
router.post("/song", songCtrl.createSong);
router.delete("/song/:id", songCtrl.deleteSong);
router.put("/song/:id", songCtrl.updateSong);

export default router;
