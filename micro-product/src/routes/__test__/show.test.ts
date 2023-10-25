import request from 'supertest';
import { app } from '../../app';
it('returns a 404 if the ticket is not found', async () => {
    const id = '11231231';
  await request(app).get(`/api/products/${id}`).send().expect(404);
});

it('returns the ticket if the ticket is found', async () => {
  const title = 'loptop';
  const price = 20;
  const description = "HP"

  const response = await request(app)
    .post('/api/products')
    .set('Cookie', global.signin())
    .send({
      title,
      price,
      description
    })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/products/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});