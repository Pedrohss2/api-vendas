import { Request, Response } from "express";
import ListUserService from "../../../services/ListUserService";
import CreateUserService from "../../../services/CreateUserService";
import { instanceToInstance } from "class-transformer";
import { container } from "tsyringe";

export default class UsersController {
  
  public async list(request: Request, response: Response): Promise<Response> {
    const listUser = container.resolve(ListUserService);

    const users = await listUser.list();

    return response.json(instanceToInstance(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.create({ name, email, password });

    return response.json(instanceToInstance(user));
  }
}
