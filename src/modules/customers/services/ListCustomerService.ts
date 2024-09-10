import AppError from "@shared/errors/appError";
import { getCustomRepository } from "typeorm";
import CustomersRepository from "../typeorm/repositories/CustomerRepository";
import Customer from "../typeorm/entities/Customers";


class ListCustomersService {

  public async list(): Promise<Customer[]> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customers = customerRepository.find();

    return customers;
  }
}

export default ListCustomersService;
