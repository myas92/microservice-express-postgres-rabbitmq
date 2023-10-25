import { Subjects, Listener, ProductCreatedEvent } from '@myaszehn/common-package';
import { queueGroupName } from './queue-group-name';

export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: ProductCreatedEvent['data']) {
     data;

    console.log("on data^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^", data)
    console.log()
    console.log()
  }
}
