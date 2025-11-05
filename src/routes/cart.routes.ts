import { Router } from "express";
import { calculateBill } from "../controllers/cart.controller";

const router = Router();

// Usamos POST para enviar un body con los IDs
router.post("/bill", calculateBill); // POST /cart/bill

export default router;