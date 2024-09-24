import {CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import OrdersProducts from "./OrdersProducts";
import { IOrders } from "@modules/orders/domain/models/IOrders";
import Customers from "@modules/customers/infra/typeorm/entities/Customers";

@Entity('orders')
class Order implements IOrders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customers)
  @JoinColumn({ name: 'customerId'}) 
  customer: Customers;
    
  @OneToMany(() => OrdersProducts, ordersProducts => ordersProducts.order, {
    cascade: true
  })
  orderProducts: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
