import Customers from "@modules/customers/typeorm/entities/Customers";
import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Order from "./Order";
import Product from "@modules/products/typeorm/entities/Product";

@Entity('orders_products')
class OrdersProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  price: number;
  
  @Column('int')
  quantity: number;

  @ManyToOne(() => Order, order => order.orderProducts)
  @JoinColumn({ name: 'orderId'}) 
  order: Order;

  @ManyToOne(() => Product, product => product.ordersProduct, {
    cascade: true
  })
  @JoinColumn({ name: 'productId'}) 
  product: Product;

  @Column()
  orderId: string;

  @Column()
  productId: string;
    
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrdersProducts;
