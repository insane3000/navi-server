import { Router } from "express";
import * as productsCtrl from "./products.controller";
import { tokenValidation } from "../../libs/validateToken";
const router = Router();
router.get("/products", tokenValidation, productsCtrl.getProducts);
router.get("/products/:id", tokenValidation, productsCtrl.getProduct);
router.post("/products", tokenValidation, productsCtrl.createProduct);
router.delete("/products/:id", tokenValidation, productsCtrl.deleteProduct);
router.put("/products/:id", tokenValidation, productsCtrl.updateProduct);

export default router;
