import { Router } from "express";
import * as cashRegisterCtrl from "./cashRegister.controller";
import { tokenValidation } from "../../libs/validateToken";
const router = Router();
router.get(
  "/cash-register",
  tokenValidation,
  cashRegisterCtrl.getCashRegisters
);
router.get(
  "/cash-register/:id",
  tokenValidation,
  cashRegisterCtrl.getCashRegister
);
router.post(
  "/cash-register",
  tokenValidation,
  cashRegisterCtrl.createCashRegister
);
router.delete(
  "/cash-register/:id",
  tokenValidation,
  cashRegisterCtrl.deleteCashRegister
);
router.put(
  "/cash-register/:id",
  tokenValidation,
  cashRegisterCtrl.updateCashRegister
);
// !Last
router.get(
  "/cash-register-one",
  tokenValidation,
  cashRegisterCtrl.getCashRegisterLast
);

export default router;
