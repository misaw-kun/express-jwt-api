import { app } from '../app';
import supertest from 'supertest';

describe('product', () => {
  // what is being tested?
  describe('get product route', () => {
    // under what conditions ?
    describe('given the product does not exist', () => {
      // expectation
      it('should return a 404', async () => {
        // expect(true).toBe(true);
        const productId = 'product-123';
        await supertest(app).get(`/api/products/${productId}`).expect(404);
      })
    })
  })
})