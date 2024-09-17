import { EntityRepository, FindConditions, FindManyOptions, Repository } from "typeorm";
import Order from "../entities/Orders";
import Customers from "@modules/customers/typeorm/entities/Customers";

interface IProduct {
  productId: string; 
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customers;
  products: IProduct[];
}

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {

  public async findById(id: string): Promise<Order | undefined> {
    const order = await this.findOne(id, {
      relations: ['orderProduct', 'customer']
    });
    
    return order;
  }

  public async createOrder({ customer, products }: IRequest): Promise<Order> {
    const order = this.create({
      customer,
      orderProducts: products,
    });

    await this.save(order);

    return order;
  }
}
 