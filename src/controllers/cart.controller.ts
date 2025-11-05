import { Request, Response } from "express";
import { CartService } from "../services/cart.service";

const cartService = new CartService();

export const calculateBill = (req: Request, res: Response) => {
    console.log("[Controller] Petición a POST /cart/bill");
    try {
        // 1. Extraemos los datos del body
        const { productIds } = req.body;

        // 2. Validamos la entrada
        if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
        return res.status(400).json({ message: "productIds debe ser un array no vacío" });
        }

        // 3. Llamamos al servicio para la lógica de negocio
        const bill = cartService.calculateBill(productIds);

        // 4. Respondemos
        res.status(200).json(bill);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};