import { Request, Response } from 'express';
import ListCustomersService from '../../../services/ListCustomerService';
import ShowCustomerService from '../../../services/ShowCustomerService';
import DeleteCustomerService from '../../../services/DeleteCustomerService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';
import CreateCustomerService from '../../../services/CreateCustomersService';
import { container, injectable } from 'tsyringe';


export default class CustomersController {

  public async list(request: Request, response: Response): Promise<Response> {
    const listCustomer = container.resolve(ListCustomersService);

    const customer = await listCustomer.list();

    return response.json(customer);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { customerId }  = request.params;
    
    const showCustomer = container.resolve(ShowCustomerService);

    const customer = await showCustomer.show({ customerId });

    return response.json(customer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.create({ name, email });

    return response.status(201).json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { userId } = request.params;
    const updateCustomer = container.resolve(UpdateCustomerService);

    const customer = await updateCustomer.update({ userId, name, email });

    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomer = container.resolve(DeleteCustomerService);

    const customer = await deleteCustomer.delete({ id });

    return response.json(customer);
  }

}

