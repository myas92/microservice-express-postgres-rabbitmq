import { Subjects, Listener, ProductCreatedEvent } from '@myaszehn/common-package';
import { queueGroupName } from './queue-group-name';
import { db } from '../config/db';
import { Order } from '../entity/order.entity';
export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: ProductCreatedEvent['data']) {
    console.log(data)
    const { title, price, description, id } = data;
    let order = await db.getRepository(Order).create({
      title,
      price,
      description,
      product_id: id
    });
    let result = await db.getRepository(Order).save(order)
    console.log("Inserted new order", result.id)

  }
}
