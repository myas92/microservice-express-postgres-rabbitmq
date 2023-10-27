import { Subjects, Listener, OrderCreatedEvent } from '@myaszehn/common-package';
import { queueGroupName } from './queue-group-name';
import { db } from '../config/db';
import { Product } from '../entity/product.entity';

export class OrderCreatedListener extends Listener<any> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;


   onMessage(data: any,msg:any, channel: any) {
    let { productId } = data
     db.getRepository(Product).delete({
      id: productId
    });
    console.log("Remove product by id after ordering")
    channel.ack(msg)
  }
}
