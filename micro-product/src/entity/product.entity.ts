import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    price: number

    @Column({ nullable: true })
    quantity: number

    @Column()
    description: string
}