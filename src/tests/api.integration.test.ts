import supertest from 'supertest';
import app from '../app';

// Creamos un "agente" de supertest que usará nuestra app
const request = supertest(app);

describe('API Integration Tests', () => {

  // --- Pruebas de relleno para /products ---
    describe('GET /api/products', () => {
        it('debería retornar 200 OK y una lista de productos', async () => {
        // Act
        const response = await request.get('/api/products');

        // Assert
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(4); // Basado en nuestra DB en memoria
        });
    });

  // --- Pruebas principales para /cart/bill ---
    describe('POST /api/cart/bill', () => {

        it('debería calcular la factura correctamente con IDs y duplicados', async () => {
        // Arrange
            const payload = {
                productIds: [1, 3, 1, 4] // (1500*2) + 120 + 450 = 3570
            };

            // Act
            const response = await request
                .post('/api/cart/bill')
                .send(payload);

            // Assert
            expect(response.status).toBe(200);
            expect(response.body.total).toBe(3570);
            expect(response.body.items.length).toBe(3); // p1 (q:2), p3 (q:1), p4 (q:1)
        });

    it('debería ignorar IDs falsos y calcular el resto', async () => {
      // Arrange
        const payload = {
            productIds: [1, 1235] // 1500
        };

      // Act
        const response = await request
            .post('/api/cart/bill')
            .send(payload);

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.total).toBe(1500);
        expect(response.body.items.length).toBe(1);
    });

    it('debería retornar 400 Bad Request si productIds está vacío', async () => {
      // Arrange
        const payload = {
            productIds: []
        };

        // Act
        const response = await request
            .post('/api/cart/bill')
            .send(payload);

        // Assert
        expect(response.status).toBe(400);
        expect(response.body.message).toContain("productIds debe ser un array no vacío");
    });

    it('debería retornar 400 Bad Request si el body está vacío', async () => {
      // Arrange
        const payload = {};

        // Act
        const response = await request
            .post('/api/cart/bill')
            .send(payload);

        // Assert
        expect(response.status).toBe(400);
        expect(response.body.message).toContain("productIds debe ser un array no vacío");
        });
    });

});