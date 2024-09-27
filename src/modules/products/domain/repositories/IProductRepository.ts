import Product from "@modules/products/infra/typeorm/entities/Product";
import { ICreateProduct } from "../models/ICreateProduct";
import { IProduct } from "../models/IProduct";
import { IUpdateStockProduct } from "../models/IUpdateStockProduct";

interface IFindProducts {
  id: string;
}

export interface IProductRepository {
  findByName(name: string): Promise<IProduct | undefined>;
  findAllById(product: IFindProducts[]): Promise<IProduct[]>;
  save(product: IProduct): Promise<Product>;
  create({ name, price, quantity }: ICreateProduct): Promise<IProduct>;
  findOne(id: string): Promise<IProduct | undefined>;
  remove(product: IProduct): Promise<void>;
  list(): Promise<IProduct[]>;
}
