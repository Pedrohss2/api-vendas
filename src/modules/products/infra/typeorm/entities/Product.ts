
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => OrdersProducts, ordersProduct => ordersProduct.product)
  ordersProduct: OrdersProducts[];

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('decimal')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
