import { ICreateCustomer } from "../models/ICreateCustomer";
import { ICustumer } from "../models/ICustomer";


export interface ICustomersRepository {
  findByName(name: string): Promise<ICustumer | undefined>;
  findById(id: string): Promise<ICustumer | undefined>;
  findByEmail(email: string): Promise<ICustumer | undefined>;
  //create(data: ICreateCustomer): Promise<ICustumer>;
  //save(customer: ICustumer): Promise<ICustumer>;
}
