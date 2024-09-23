import AppError from '@shared/errors/appError';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import { ICustumer } from '../domain/models/ICustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateCustomerService {

  constructor(
    @inject('CustomersRepository') private customersRepository: ICustomersRepository
  ) { };

  public async create({ name, email }: ICreateCustomer): Promise<ICustumer> {
    const emailExists = await this.customersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const customer = await this.customersRepository.create({
      name,
      email,
    });

    return customer;
  }
}

export default CreateCustomerService;
