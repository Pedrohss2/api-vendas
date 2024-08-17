import { Request, Response } from "express";
import ListUserService from "../services/ListUserService";
import User from "../typeorm/entities/User";
import CreateUserService from "../services/CreateUserService";

export default class UsersController {
  
  public async list(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUserService();

    const users = await listUser.list();

    return response.json(users);
  }


  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const user = new CreateUserService();

    const createUser = await user.create({ name, email, password });

    return response.json(createUser);
  }
}
