import { Router } from "express";
import productRouter from "./product.routes";
import cartRouter from "./cart.routes";

const router = Router();

// Asigna las rutas
router.use("/products", productRouter);
router.use("/cart", cartRouter);

export default router;