import { Request, Response } from "express";
import ShowOrderService from "../../../services/ShowOrderService";
import CreateOrderService from "../../../services/CreateOrderService";
import { container } from "tsyringe";


export default class ProductsController {

  public async show(request: Request, response: Response): Promise<Response>  {
    const { id } = request.params;
    
    const showOrder = container.resolve(ShowOrderService);

    const order = await showOrder.show({ id });

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customerId, products } = request.body;
    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({
      customerId,
      products
    });

    return response.status(201).json(order);
  }

}
