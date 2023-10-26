import {Publisher, Subjects} from '@myaszehn/common-package'

export class OrderCreatedPublisher extends Publisher<any> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    
}