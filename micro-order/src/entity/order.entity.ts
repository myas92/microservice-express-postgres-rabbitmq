import { Entity, Column, PrimaryGeneratedColumn ,ManyToOne , JoinColumn} from "typeorm"
@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    title: string

    @Column()
    price: number

    
    // // Each order hast multiple product
    // @ManyToOne(type => Product, product => product.orderss)
    // @JoinColumn({ referencedColumnName: "id", name: "product_id" })
    // product: Product
}