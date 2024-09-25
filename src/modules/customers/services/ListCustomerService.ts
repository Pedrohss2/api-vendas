import AppError from "@shared/errors/appError";
import { createQueryBuilder, getCustomRepository } from "typeorm";
import CustomersRepository from "../infra/typeorm/repositories/CustomerRepository";
import Customer from "../infra/typeorm/entities/Customers";
import { inject, injectable } from "tsyringe";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { ICustumer } from "../domain/models/ICustomer";

@injectable()
class ListCustomersService {

  constructor(
    @inject('CustomersRepository') private customersRepository: ICustomersRepository
  ) { };

  public async list(): Promise<ICustumer[]> {
    const customers = await this.customersRepository.list();

    return customers;
  }
}

export default ListCustomersService;
