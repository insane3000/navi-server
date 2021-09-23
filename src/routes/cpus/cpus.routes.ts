import { Router } from "express";
import * as cpusCtrl from "./cpus.controller";

const router = Router();
router.get("/cpu", cpusCtrl.getCpus);
router.get("/cpu/:id", cpusCtrl.getCpu);
router.post("/cpu", cpusCtrl.createCpu);
router.delete("/cpu/:id", cpusCtrl.deleteCpu);
router.put("/cpu/:id", cpusCtrl.updateCpu);

export default router;
