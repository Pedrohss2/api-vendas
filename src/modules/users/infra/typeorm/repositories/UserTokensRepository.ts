import { getRepository, Repository } from "typeorm";
import UserToken from "../entities/UserToken";
import { IUserTokenRepository } from "@modules/users/domain/repositories/IUserTokenRepository";

class UserTokensRepository implements IUserTokenRepository {
  private ormConfig: Repository<UserToken>;

  constructor() {
    this.ormConfig = getRepository(UserToken)
  }
  
  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormConfig.findOne({
      where: {
        token,
      }
    });
    
    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = await this.ormConfig.create({ user_id });
    
    await this.ormConfig.save(userToken);
    
    return userToken;
  }
}

export default UserTokensRepository;
