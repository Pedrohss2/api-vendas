import User from "../entities/User";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { getRepository, Repository } from "typeorm";
import { IUser } from "../../../domain/models/IUser";
import { ICreateUser } from "@modules/users/domain/models/ICreateUser";

class UserRepository implements IUserRepository {
  
 private ormConfig: Repository<User>;
  
  constructor() {
    this.ormConfig = getRepository(User);
  }

  public async create({name, email, password }: ICreateUser): Promise<IUser> {
    const user = await this.ormConfig.create({ name, email, password  });
    
    await this.ormConfig.save(user);

    return user;
  }

  public async save(user: IUser): Promise<IUser> {
    await this.ormConfig.save(user);
    
    return user;
  }
  
  public async list(): Promise<IUser[]> {
    const users = await this.ormConfig.find();
    return users;
  }

  public async remove({id }: IUser): Promise<void> {
    await this.ormConfig.delete(id);
  }

  public async findByName(name: string): Promise<IUser | undefined> {
    const user = await this.ormConfig.findOne({
      where: {
        name,
      }
    });
    
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormConfig.findOne({
      where: {
        id,
      }
    });
    
    return user;
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = await this.ormConfig.findOne({
      where: {
        email,
      }
    });
    
    return user;
  }
}

export default UserRepository;
