import { Router } from "express";
import { getAllProducts } from "../controllers/product.controller";

const router = Router();

router.get("/", getAllProducts); // GET /products

export default router;