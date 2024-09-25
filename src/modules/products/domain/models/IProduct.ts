import { IOrdersProducts } from "@modules/orders/domain/models/IOrdersProducts";

export interface IProduct {
  id: string;

  ordersProduct: IOrdersProducts[];

  name: string;

  price: number;

  quantity: number;

  created_at: Date;

  updated_at: Date;
}
