import { Subjects } from "./subjects";

export interface ProductCreatedEvent {
    subject: Subjects.ProductCreated;
    data: {
        id: number,
        title: string,
        price: number,
        quantity: number,
        description: string  
    };
}