import { Request, Response } from "express";
import { ProductRepository } from "../repositories/product.repository";

const repo = new ProductRepository();

// Controlador de relleno
export const getAllProducts = (req: Request, res: Response) => {
    console.log("[Controller] Petición a GET /products");
    try {
        const products = repo.getAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};