import { PRODUCT_DB } from "../data/in-memory.db";
import { Product } from "../models/product.model";

// El Repositorio sigue el Patrón de Repositorio
// Es la ÚNICA capa que sabe CÓMO se guardan los datos (en este caso, un array)
export class ProductRepository {
    
    // Función de "relleno" para listar productos
    public getAll(): Product[] {
        console.log("[Repository] Obteniendo todos los productos");
        return PRODUCT_DB;
    }

    // Función clave que usará el carrito
    // Busca productos basados en una lista de IDs
    public getByIds(ids: number[]): Product[] {
        console.log(`[Repository] Buscando productos con IDs: ${ids.join(", ")}`);
        return PRODUCT_DB.filter(product => ids.includes(product.id));
    }
}