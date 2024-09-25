import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/appError";
import CustomersRepository from "../infra/typeorm/repositories/CustomerRepository";
import Customer from "../infra/typeorm/entities/Customers";
import { inject, injectable } from "tsyringe";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";

type IRequest = {
  userId: string;
  name: string;
  email: string;
}

@injectable()
class UpdateCustomerService {

  constructor(
    @inject('CustomersRepository') private customersRepository: ICustomersRepository
  ) { };

  public async update({ userId, name, email }: IRequest): Promise<Customer> {

    const customer = await this.customersRepository.findById(userId);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    const customerExist = await this.customersRepository.findByEmail(email);

    if (customerExist && email !== customer.email) throw new AppError('There is already one customer with this email.');

    customer.name = name;
    customer.email = email;

    await this.customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
