import { getRepository, Repository } from "typeorm";
import Customers from "../entities/Customers";
import { ICreateCustomer } from "@modules/customers/domain/models/ICreateCustomer";
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import { ICustumer } from "@modules/customers/domain/models/ICustomer";

class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customers>;

  constructor() {
    this.ormRepository = getRepository(Customers);
  }

  public async list(): Promise<ICustumer[]> {
    const customers = await this.ormRepository.find();

    return customers;
  }

  public async create({ name, email }: ICreateCustomer): Promise<ICustumer> {
    const customer = await this.ormRepository.create({ name, email });
    
    await this.ormRepository.save(customer);

    return customer;
  }


  public async save(customer: Customers): Promise<ICustumer> {
    
    await this.ormRepository.save(customer);

    return customer;
  }

  public async findByName(name: string): Promise<ICustumer | undefined> {
  
    const customer = await this.ormRepository.findOne({
      where: {
        name,
      }
    });
    
    return customer;
  }

  public async findById(id: string): Promise<Customers | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        id,
      }
    });
    
    return customer;
  }

  public async findOne(id: string): Promise<Customers | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        id,
      }
    });
    
    return customer;
  }


  public async findByEmail(email: string): Promise<Customers | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        email,
      }
    });
    
    return customer;
  }
  
  public async remove({ id }: ICustumer): Promise<void> {
    const productDeleted = await this.ormRepository.delete(id);
  }
}

export default CustomersRepository;
