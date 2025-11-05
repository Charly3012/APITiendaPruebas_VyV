import { CartService } from './cart.service';
import { ProductRepository } from '../repositories/product.repository';
import { Product } from '../models/product.model';

// Datos falsos para nuestras pruebas
const MOCK_PRODUCTS: Product[] = [
    { id: 1, name: "Laptop", price: 1500 },
    { id: 2, name: "Mouse", price: 40 },
    { id: 3, name: "Teclado", price: 120 },
];

// 1. Simular (mock) el módulo del repositorio
// Le decimos a Jest que cualquier importación de este módulo debe ser reemplazada por un mock
jest.mock('../repositories/product.repository');

// 2. Creamos una instancia "mockeada" de la clase
const MockProductRepository = ProductRepository as jest.MockedClass<typeof ProductRepository>;

// 3. Mockeamos la implementación de la función que usa nuestro servicio
// Le decimos: "Cuando llamen a 'getByIds', retorna esta data"
MockProductRepository.prototype.getByIds = jest.fn()
    .mockImplementation((ids: number[]) => {
        return MOCK_PRODUCTS.filter(p => ids.includes(p.id));
    });


// --- AHORA EMPIEZAN LAS PRUEBAS ---

describe('CartService', () => {

    let cartService: CartService;

    beforeEach(() => {
        // Limpiamos los mocks antes de CADA prueba
        MockProductRepository.prototype.getByIds.mockClear();
        
        // Creamos una nueva instancia del servicio para cada prueba
        // Esto asegura que las pruebas estén aisladas
        cartService = new CartService();
    });

    it('debería calcular el total correctamente para múltiples productos', () => {
        // Arrange (Organizar)
        const productIds = [1, 2]; // 1500 + 40
        
        // Act (Actuar)
        const result = cartService.calculateBill(productIds);

        // Assert (Afirmar)
        expect(result.total).toBe(1540);
        expect(result.items.length).toBe(2);
        expect(MockProductRepository.prototype.getByIds).toHaveBeenCalledTimes(1);
        expect(MockProductRepository.prototype.getByIds).toHaveBeenCalledWith([1, 2]);
    });

    it('debería agrupar productos duplicados', () => {
        // Arrange
        const productIds = [1, 3, 1]; // (1500 * 2) + 120
        
        // Act
        const result = cartService.calculateBill(productIds);

        // Assert
        expect(result.total).toBe(3120);
        expect(result.items.length).toBe(2); // Solo 2 items: Laptop (q:2) y Teclado (q:1)
        
        const laptopItem = result.items.find(item => item.product.id === 1);
        expect(laptopItem?.quantity).toBe(2);
    });

    it('debería ignorar IDs de productos no existentes', () => {
        // Arrange
        const productIds = [1, 1235, 2]; // 1500 + 40
        
        // Act
        const result = cartService.calculateBill(productIds);

        // Assert
        expect(result.total).toBe(1540);
        expect(result.items.length).toBe(2); // Ignora 'id-falso'
        expect(MockProductRepository.prototype.getByIds).toHaveBeenCalledWith([1, 1235, 2]);
    });

    it('debería devolver 0 si la lista de IDs está vacía', () => {
        // Arrange
        const productIds: number[] = [];
        
        // Act
        const result = cartService.calculateBill(productIds);

        // Assert
        expect(result.total).toBe(0);
        expect(result.items.length).toBe(0);
    });
});