import request from 'supertest';
import { app } from '../../app';
import { rabbitWrapper } from '../../rabbit-wrapper';

it('returns a 404 if the provided id does not exist', async () => {
  const id = '232323'
  await request(app)
    .put(`/api/products/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'aslkdfj',
      price: 20,
      description: "",
    })
    .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
  const id = '232323'
  await request(app)
    .put(`/api/products/${id}`)
    .send({
      title: 'aslkdfj',
      price: 20,
      description: "",
    })
    .expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
  const response = await request(app)
    .post('/api/products')
    .set('Cookie', global.signin())
    .send({
      title: 'asldkfj',
      price: 20,
      description: "",
    });

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'alskdjflskjdf',
      price: 1000,
      description: "",
    })
    .expect(401);
});

it('returns a 400 if the user provides an invalid title or price', async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post('/api/products')
    .set('Cookie', cookie)
    .send({
      title: 'asldkfj',
      price: 20,
      description: "",
    });

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 20,
      description: "",
    })
    .expect(400);

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'alskdfjj',
      price: -10,
      description: "",
    })
    .expect(400);
});

it('updates the ticket provided valid inputs', async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post('/api/products')
    .set('Cookie', cookie)
    .send({
      title: 'asldkfj',
      price: 20,
      description: "",
    });

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new title',
      price: 100,
      description: "",
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/products/${response.body.id}`)
    .send();

  expect(ticketResponse.body.title).toEqual('new title');
  expect(ticketResponse.body.price).toEqual(100);
});


it('publishes an event', async()=>{
  const cookie = global.signin();

  const response = await request(app)
    .post('/api/products')
    .set('Cookie', cookie)
    .send({
      title: 'asldkfj',
      price: 20,
      description: "",
    });

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new title',
      price: 100,
      description: "",
    })
    .expect(200);

    expect(rabbitWrapper.client.publish).toHaveBeenCalled();
})