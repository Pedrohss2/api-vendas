import AppError from "@shared/errors/appError";
import { createQueryBuilder, getCustomRepository } from "typeorm";
import CustomersRepository from "../infra/typeorm/repositories/CustomerRepository";
import Customer from "../infra/typeorm/entities/Customers";

interface IPaginateCustomer {
  from: number,
  to: number,
  per_page: number,
  total: number,
  current_page: number,
  prev_page: number | null,
  next_page: number | null,
  data: Customer[],
}

class ListCustomersService {

  public async list(): Promise<IPaginateCustomer> {
    const customerRepository = getCustomRepository(CustomersRepository);
    const customers = await customerRepository.createQueryBuilder().paginate();

    return customers as IPaginateCustomer;
  }
}

export default ListCustomersService;
