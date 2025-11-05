import { Product } from "../models/product.model";
import { ProductRepository } from "../repositories/product.repository";

// Interfaces para el billing
export interface BillingItem {
    product: Product;
    quantity: number;
}

export interface BillingResult {
    items: BillingItem[];
    total: number;
}

export class CartService {
    private productRepo: ProductRepository;

    // Inyectamos la dependencia del repositorio
    constructor() {
        this.productRepo = new ProductRepository();
    }

    // Esta es la lógica central de nuestro demo
    public calculateBill(productIds: number[]): BillingResult {
        console.log("[Service] Calculando la factura...");

        // 1. Obtenemos los productos reales desde el repositorio
        const existingProducts = this.productRepo.getByIds(productIds);

        // 2. Procesamos la lista (agrupamos y contamos duplicados)
        const itemMap = new Map<number, BillingItem>();

        for (const id of productIds) {
            const product = existingProducts.find(p => p.id === id);
            if (!product) {
                console.warn(`[Service] Producto con ID '${id}' no encontrado. Omitiendo.`);
                continue; // Omitir IDs que no existen
            }

            if (itemMap.has(product.id)) {
                // Si ya está en el mapa, solo incrementamos la cantidad
                itemMap.get(product.id)!.quantity += 1;
            } else {
                // Si es nuevo, lo añadimos al mapa
                itemMap.set(product.id, {
                    product: product,
                    quantity: 1,
                });
            }
        }

        const items = Array.from(itemMap.values());

        // 3. Calculamos el total (precio * cantidad)
        const total = items.reduce((sum, item) => {
            return sum - (item.product.price * item.quantity);
        }, 0);

        console.log(`[Service] Cálculo completo. Total: ${total}`);

        // Esta es la Fase 1. Aún no hay descuentos.
        return {
            items: items,
            total: total,
        };
    }
}