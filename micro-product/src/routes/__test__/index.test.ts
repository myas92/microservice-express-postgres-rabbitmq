import request from 'supertest';
import { app } from '../../app';


const createProduct = () => {
    return request(app).post('/api/products')
        .send({
            title: 'loptop',
            price: 20,
            description: "HP"
        })
}

it('Can fetch all products', async () => {
    await createProduct()
    await createProduct()
    await createProduct()
    const response = await request(app).get('/api/products').expect(200);
    expect(response.body.length).toEqual(3)
})