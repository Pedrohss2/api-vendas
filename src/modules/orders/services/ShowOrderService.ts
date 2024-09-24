import AppError from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";
import { IOrdersRepository } from "../domain/repositories/IOrdersRepository";
import { IOrders } from "../domain/models/IOrders";
import { IShowOrder } from "../domain/models/IShowOrder";

@injectable()
class ShowOrderService {

  constructor(@inject('OrdersRepository') private ordersRepository: IOrdersRepository) { }
  
  public async show({ id }: IShowOrder): Promise<IOrders> {

    const order = await this.ordersRepository.show(id);
    
    if (!order) throw new AppError("Order not found!");

    return order;
  }

}

export default ShowOrderService;
