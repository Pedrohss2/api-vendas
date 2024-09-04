import AppError from "@shared/errors/appError";
import { getCustomRepository } from "typeorm";
import { isAfter, addHours } from 'date-fns';
import UserRepository from "../typeorm/repositories/UserRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import { hash } from "bcryptjs";

interface IRequest {
  token: string;
  password: string;
}

class ResePasswordService {

  public async create({ token, password }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) throw new AppError('User Token does not exists!');

    const user = await userRepository.findById(userToken.user_id);

    if (!user) throw new AppError('User does not exists!');
    
    this.validateHours(userToken.created_at);
    
    user.password = await hash(password, 8);

    await userRepository.save(user);
  }

  public async validateHours(created_at: Date): Promise<void> {
    const tokenCreatedAt = created_at;

    const compareDate = addHours(tokenCreatedAt, 2);

    isAfter(Date.now(), compareDate) ? new AppError('Token exprired') : null; 
  }
}

export default ResePasswordService;
