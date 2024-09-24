import { IProduct } from "@modules/products/domain/models/IProduct";

export interface IRequestCreateOrder {
  customerId: string;
  products: IProduct[];
}
