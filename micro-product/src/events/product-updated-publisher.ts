import {Publisher, Subjects, ProductUpdatedEvent} from '@myaszehn/common-package'

export class ProductUpdatedPublisher extends Publisher<ProductUpdatedEvent> {
    subject: Subjects.ProductUpdated = Subjects.ProductUpdated;
    
}