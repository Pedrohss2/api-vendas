import { getCustomRepository } from "typeorm";
import Customer from "../infra/typeorm/entities/Customers";
import customersRepository from "../infra/typeorm/repositories/CustomerRepository";
import AppError from "@shared/errors/appError";

interface IRequest {
  customerId: string;
} 

class ShowCustomerService {
  public async show({ customerId }: IRequest): Promise<Customer | AppError> {
    const customerRepository = getCustomRepository(customersRepository);
    const customer = await customerRepository.findById(customerId);

    if (!customer) throw new AppError("Customer not found");

    return customer;
  }

}


export default ShowCustomerService;
