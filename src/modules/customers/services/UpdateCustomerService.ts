import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/appError";
import CustomersRepository from "../typeorm/repositories/CustomerRepository";
import Customer from "../typeorm/entities/Customers";

type IRequest = {
  userId: string;
  name: string;
  email: string;
}


class UpdateCustomerService {
  public async update({ userId, name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(userId);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    const customerExist = await customersRepository.findByEmail(email);

    if (customerExist && email !== customer.email) throw new AppError('There is already one customer with this email.');

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
