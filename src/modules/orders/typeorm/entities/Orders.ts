import Customers from "@modules/customers/typeorm/entities/Customers";
import {CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import OrdersProducts from "./OrdersProducts";

@Entity('orders')
class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customers)
  @JoinColumn({ name: 'customerId'}) 
  customer: Customers;
    
  @OneToMany(() => OrdersProducts, ordersProducts => ordersProducts.order)
  orderProducts: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Orders;
