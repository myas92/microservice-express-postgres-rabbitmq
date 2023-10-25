import request from 'supertest';
import { app } from '../../app';
import { rabbitWrapper } from '../../rabbit-wrapper';



it('Has a route handler listening to api/products for post requests', async () => {

    const response = await request(app).post('/api/products').send({});
    expect(response.status).not.toEqual(404)
})
it('Can only be accessed if the user is signed in', async () => {
    await request(app).post('/api/products').send({}).expect(401)

})
it('Returns a status code other than 401 if the user signed in ', async () => {
    const response = await request(app).post('/api/products').set('Cookie', global.signin()).send({});
    expect(response.statusCode).not.toEqual(401)
})
it('Returns an error if an invalid title is provided', async () => {

    await request(app).post('/api/products').set('Cookie', global.signin())
        .send({
            title: "",
            price: 100,
            description:"",
        }).expect(400)
    await request(app).post('/api/products').set('Cookie', global.signin())
        .send({
            title: "",
        }).expect(400)
})
it('Returns an error if an invelid price is provided', async () => {
    await request(app).post('/api/products').set('Cookie', global.signin())
        .send({
            title: "my title",
            price: -100,
            description:"",
        }).expect(400)
    await request(app).post('/api/products').set('Cookie', global.signin())
        .send({
            title: "my title",
        }).expect(400)
})
it('Create a products with valid inputs', async () => {
    let products:any = []
    expect(products.length).toEqual(0);
    const title = "test title";
    await request(app).post('/api/products').set('Cookie', global.signin())
        .send({
            title: title,
            price: 20,
            description:"",
        })
        .expect(201);
    products = []
    expect(products.length).toEqual(1);
    expect(products[0].price).toEqual(20);
    expect(products[0].title).toEqual(title);
})

it('publishes an event', async () => {
    const title = "test title";
    await request(app).post('/api/products').set('Cookie', global.signin())
        .send({
            title: title,
            price: 20,
            description:"",
        })
        .expect(201);


        expect(rabbitWrapper.client.publish).toHaveBeenCalled()

})