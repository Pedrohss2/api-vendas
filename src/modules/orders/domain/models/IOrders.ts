import Customers from "@modules/customers/infra/typeorm/entities/Customers";
import OrdersProducts from "@modules/orders/infra/typeorm/entities/OrdersProducts";

export interface IOrders {
  id: string;

  customer: Customers;

  orderProducts: OrdersProducts[];

  created_at: Date;
  
  updated_at: Date;
}
