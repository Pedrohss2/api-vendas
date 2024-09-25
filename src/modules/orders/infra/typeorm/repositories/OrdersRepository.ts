import Order from "../entities/Orders";
import { IOrdersRepository } from "@modules/orders/domain/repositories/IOrdersRepository";
import Customers from "@modules/customers/infra/typeorm/entities/Customers";
import { getRepository, Repository } from "typeorm";

interface IProduct {
  productId: string; 
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customers;
  products: IProduct[];
}

export class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async show(id: string): Promise<Order | undefined> {
    
    const order = await this.ormRepository.findOne(id, {
      relations: ['orderProducts', 'customer']
    });
    
    return order;
  }

  public async create({ customer, products }: IRequest): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      orderProducts: products,
    });

    await this.ormRepository.save(order);

    return order;
  }
}
 