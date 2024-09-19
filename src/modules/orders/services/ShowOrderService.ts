import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/Orders";
import { OrdersRepository } from "../typeorm/repositories/OrdersRepository";
import CustomersRepository from "@modules/customers/typeorm/repositories/CustomerRepository";
import { ProductsRepository } from "@modules/products/typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/appError";

interface IRequest {
  id: string;
}

class ShowOrderService {

  public async show({ id }: IRequest): Promise<Order> {
    const orderRepository = getCustomRepository(OrdersRepository);

    const order = await orderRepository.show(id);
    
    if (!order) throw new AppError("Order not found!");

    return order;
  }

}

export default ShowOrderService;
