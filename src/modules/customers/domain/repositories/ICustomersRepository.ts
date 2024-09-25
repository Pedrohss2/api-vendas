import { IPaginateProduct } from "@modules/products/domain/models/IPaginateProduct";
import { ICreateCustomer } from "../models/ICreateCustomer";
import { ICustumer } from "../models/ICustomer";


export interface ICustomersRepository {
  findByName(name: string): Promise<ICustumer | undefined>;
  findById(id: string): Promise<ICustumer | undefined>;
  findByEmail(email: string): Promise<ICustumer | undefined>;
  create(data: ICreateCustomer): Promise<ICustumer>;
  save(customer: ICustumer): Promise<ICustumer>;
  remove(customer: ICustumer): Promise<void>;
  findOne(id: string): Promise<ICustumer | undefined>;
  list(): Promise<ICustumer[]>; 
}
