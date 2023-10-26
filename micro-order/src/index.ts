
import { app } from './app'
import { db } from "./config/db"
import { ProductCreatedListener } from './events/product-created-listener';
import { rabbitWrapper } from './rabbit-wrapper'
let channel;
const start = async () => {
  try {
    if (!process.env.NODE_ENV) {
      throw new Error('NODE_ENV must be defined')
    }
    if (!process.env.SERVER_PORT ) {
      throw new Error('SERVER_PORT must be defined')
    }
    if (!process.env.PG_PORT ) {
      throw new Error('PG_PORT must be defined')
    }
    if (!process.env.RABBITMQ_HOST) {
      throw new Error('RABBITMQ_HOST must be defined')
    }
    if (!process.env.RABBITMQ_PORT) {
      throw new Error('RABBITMQ_PORT must be defined')
    }

    console.log("----------------------")
    console.log('order')
    console.log(process.env.NODE_ENV)
    console.log(process.env.SERVER_PORT)
    console.log("----------------------")
    try {
      db.initialize()
      console.log('Order database Connected')
    } catch (error) {
      console.error('Error connecting to order database:',error)
      process.exit();
    }
    try {
      await rabbitWrapper.connect(process.env.RABBITMQ_HOST, process.env.RABBITMQ_PORT);

      // await rabbitWrapper.connect(process.env.RABBITMQ_HOST, process.env.RABBITMQ_PORT, 'order_channel');
      new ProductCreatedListener(rabbitWrapper.channel, rabbitWrapper.productQueue).listen();
    } catch (error) {
      console.error("Error connecting to RabbitMQ: ", error)
      process.exit();
    }

  } catch (error) {
    console.error(error)
  }
}


start()
app.listen(process.env.SERVER_PORT, async () => {
  console.log(`Order server listening on port ${process.env.SERVER_PORT}:)`);
});