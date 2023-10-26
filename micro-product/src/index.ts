
import { app } from './app'
import { db } from "./config/db"
import amqp from 'amqplib'
import { rabbitWrapper } from './rabbit-wrapper'
import { OrderCreatedListener } from './events/order-created-listener';
let channel;
const start = async () => {
  console.log("----------------------")
  console.log('**product**')
  console.log(process.env.NODE_ENV)
  console.log(process.env.SERVER_PORT)
  console.log("----------------------")
  if (!process.env.NODE_ENV) {
    throw new Error('NODE_ENV must be defined')
  }
  if (!process.env.SERVER_PORT) {
    throw new Error('SERVER_PORT must be defined')
  }
  if (!process.env.PG_PORT) {
    throw new Error('PG_PORT must be defined')
  }
  if (!process.env.RABBITMQ_HOST) {
    throw new Error('RABBITMQ_HOST must be defined')
  }
  if (!process.env.RABBITMQ_PORT) {
    throw new Error('RABBITMQ_PORT must be defined')
  }

  try {
    db.initialize()
    console.log('Product database Connected')
  } catch (error) {
    console.error('Error connecting to product database', error);
    process.exit();
  }
  try {
    await rabbitWrapper.connect(process.env.RABBITMQ_HOST, process.env.RABBITMQ_PORT);
    new OrderCreatedListener(rabbitWrapper.channel, rabbitWrapper.orderQueue).listen();
  } catch (error) {
    console.error("Error connecting to RabbitMQ: ", error);
    process.exit();
  }
}


start()
app.listen(process.env.SERVER_PORT, async () => {
  console.log(`Product server listening on port ${process.env.SERVER_PORT}!!!!!!`);
});