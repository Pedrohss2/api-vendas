import Order from "@modules/orders/infra/typeorm/entities/Orders";
import { IOrders } from "../models/IOrders";
import Customers from "@modules/customers/infra/typeorm/entities/Customers";
import { ICustumer } from "@modules/customers/domain/models/ICustomer";

interface IProduct {
  productId: string; 
  price: number;
  quantity: number;
}

interface IRequest {
  customer: ICustumer;
  products: IProduct[];
}

export interface IOrdersRepository {
  show(id: string): Promise<IOrders | undefined>;
  create({ customer, products}: IRequest): Promise<Order>; 
}

