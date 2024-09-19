import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";


interface IPaginateUser {
  from: number,
  to: number,
  per_page: number,
  total: number,
  current_page: number,
  prev_page: number | null,
  next_page: number | null,
  data: User[],
}

class ListUserService {
  public async list(): Promise<IPaginateUser> {
    const user = getCustomRepository(UserRepository);

    const users = await user.createQueryBuilder().paginate();
    
    return users as IPaginateUser;
  }
}

export default ListUserService;
