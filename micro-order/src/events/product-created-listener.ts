import { Subjects, Listener, ProductCreatedEvent } from '@myaszehn/common-package';
import { queueGroupName } from './queue-group-name';
import { db } from '../config/db';
import { Product } from '../entity/product.entity';
import { rabbitWrapper } from '../rabbit-wrapper';
export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: ProductCreatedEvent['data'], msg:any, channel:any) {
    const { title, price, description, id, quantity } = data;
    // console.log('data from product:-->',data )
    let product = await db.getRepository(Product).create({
      id,
      title,
      price,
      quantity,
      description
    });

    let result = await db.getRepository(Product).save(product)
    console.log("Inserted new product in micro-order service", result.id);
    channel.ack(msg)
  }
}
