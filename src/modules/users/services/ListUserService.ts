
import { IUser } from "../domain/models/IUser";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";

@injectable()
class ListUserService {
  
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) { }
  
  public async list(): Promise<IUser[]> {

    const users = await this.userRepository.list();
    
    return users;
  }
}

export default ListUserService;
