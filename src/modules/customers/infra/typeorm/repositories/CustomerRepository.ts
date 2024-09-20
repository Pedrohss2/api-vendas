import { EntityRepository, Repository } from "typeorm";
import Customers from "../entities/Customers";
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";

@EntityRepository(Customers)
class CustomersRepository extends Repository<Customers> implements ICustomersRepository{
  
  public async findByName(name: string): Promise<Customers | undefined> {
    const customer = await this.findOne({
      where: {
        name,
      }
    });
    
    return customer;
  }

  public async findById(id: string): Promise<Customers| undefined> {
    const customer = await this.findOne({
      where: {
        id,
      }
    });
    
    return customer;
  }

  public async findByEmail(email: string): Promise<Customers | undefined> {
    const customer = await this.findOne({
      where: {
        email,
      }
    });
    
    return customer;
  }
}

export default CustomersRepository;
