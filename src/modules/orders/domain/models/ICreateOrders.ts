import { IOrdersProducts } from "./IOrdersProducts";

export interface ICreateOrders {
  id: string;
  quantity: number;
  products: IOrdersProducts[];
}
