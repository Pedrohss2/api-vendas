import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/appError";
import CustomersRepository from "../typeorm/repositories/CustomerRepository";

interface IRequest {
  id: string;
}

class DeleteCustomerService {
  
  public async delete( { id } : IRequest ): Promise<void> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customer = await customersRepository.findOne(id);

    if (!customer) throw new AppError("Customer not found!", 404);
  
    await customersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
