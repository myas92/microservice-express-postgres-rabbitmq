import { Subjects } from "./subjects";

export interface ProductUpdatedEvent {
    subject: Subjects.ProductUpdated;
    data: {
        id: number,
        title: string,
        price: number,
        description: string  
    }
}