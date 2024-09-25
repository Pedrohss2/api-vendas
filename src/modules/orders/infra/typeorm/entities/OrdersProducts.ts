import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Order from "./Orders";
import Product from "@modules/products/infra/typeorm/entities/Product";
import { IOrdersProducts } from "@modules/orders/domain/models/IOrdersProducts";

@Entity('orders_products')
class OrdersProducts implements IOrdersProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, order => order.orderProducts)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => Product, product => product.ordersProduct)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  orderId: string;

  @Column()
  productId: string;

  @Column('decimal')
  price: number;
  
  @Column('int')
  quantity: number;
    
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrdersProducts;
