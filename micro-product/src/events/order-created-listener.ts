import { Subjects, Listener, OrderCreatedEvent } from '@myaszehn/common-package';
import { queueGroupName } from './queue-group-name';
import { db } from '../config/db';
import { Product } from '../entity/product.entity';
export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: any) {
    let { productId } = data
    console.log("data:   -----------", data)
    await db.getRepository(Product).delete({
      id: productId
    });
    console.log("Remove product by id after ordering")

  }
}
