import { getCustomRepository } from "typeorm";
import Customer from "../infra/typeorm/entities/Customers";
import customersRepository from "../infra/typeorm/repositories/CustomerRepository";
import AppError from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";

interface IRequest {
  customerId: string;
} 

@injectable()
class ShowCustomerService {

  constructor(
    @inject('CustomersRepository') private customersRepository: ICustomersRepository
  ) { };

  public async show({ customerId }: IRequest): Promise<Customer | AppError> {
    const customer = await this.customersRepository.findById(customerId);

    if (!customer) throw new AppError("Customer not found");

    return customer;
  }

}


export default ShowCustomerService;
