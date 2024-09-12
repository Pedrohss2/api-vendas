import { Request, Response } from "express";
import ShowOrderService from "../services/ShowOrderService";
import CreateOrderService from "../services/CreateOrderService";


export default class ProductsController {

  public async show(request: Request, response: Response): Promise<Response>  {
    const { id } = request.params;
    
    const showOrder = new ShowOrderService();

    const order = await showOrder.show({ id });

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customerId, products } = request.body;
    const createOrder = new CreateOrderService();

    const order = await createOrder.execute({
      customerId,
      products
    });

    return response.status(201).json(order);
  }

}
