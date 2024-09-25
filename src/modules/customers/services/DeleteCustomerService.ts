import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/appError";
import CustomersRepository from "../infra/typeorm/repositories/CustomerRepository";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
}

@injectable()
class DeleteCustomerService {
  
  constructor(
    @inject('CustomersRepository') private customersRepository: ICustomersRepository
  ) { };

  public async delete( { id } : IRequest ): Promise<void> {
    const customer = await this.customersRepository.findOne(id);

    if (!customer) throw new AppError("Customer not found!", 404);
  
    await this.customersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
