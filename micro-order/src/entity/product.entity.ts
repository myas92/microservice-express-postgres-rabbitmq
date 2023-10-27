import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"
import { Order } from "./order.entity"

@Entity()
export class Product {
    @PrimaryColumn()
    id: number

    @Column()
    title: string

    @Column()
    price: number

    @Column({ nullable: true })
    quantity: number

    @Column()
    description: string


    // // Relation with Order -> every order hast multiple product
    // @OneToMany(type => Order, order => order.product, { nullable: true })
    // orderss: Order[]

}