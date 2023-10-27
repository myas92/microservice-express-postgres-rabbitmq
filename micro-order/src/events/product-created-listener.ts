import { Subjects, Listener, ProductCreatedEvent } from '@myaszehn/common-package';
import { queueGroupName } from './queue-group-name';
import { db } from '../config/db';
import { Product } from '../entity/product.entity';
export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: ProductCreatedEvent['data']) {
    const { title, price, description, id } = data;
    let product = await db.getRepository(Product).create({
      id,
      title,
      price,
      description
    });
    let result = await db.getRepository(Product).save(product)
    console.log("Inserted new product in micro-order service", result.id)

  }
}
