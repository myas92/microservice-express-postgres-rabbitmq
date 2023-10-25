import request from 'supertest';
import { app } from '../../app';


const createOrder = () => {
    return request(app).post('/api/orders')
        .send({
            title: 'loptop',
            price: 20,
            description: "HP"
        })
}

it('Can fetch all orders', async () => {
    await createOrder()
    await createOrder()
    await createOrder()
    const response = await request(app).get('/api/orders').expect(200);
    expect(response.body.length).toEqual(3)
})