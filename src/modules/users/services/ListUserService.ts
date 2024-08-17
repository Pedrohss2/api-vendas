import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";

class ListUserService {
  public async list(): Promise<User[]> {
    const user = getCustomRepository(UserRepository);

    const users = await user.find();
    
    return users;
  }
}

export default ListUserService;
