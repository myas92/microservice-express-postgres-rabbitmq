import {Publisher, Subjects, ProductCreatedEvent} from '@myaszehn/common-package'
export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
    subject: Subjects.ProductCreated = Subjects.ProductCreated;
    
}