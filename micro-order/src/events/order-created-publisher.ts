import {Publisher, Subjects, OrderCreatedEvent} from '@myaszehn/common-package'

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    
}