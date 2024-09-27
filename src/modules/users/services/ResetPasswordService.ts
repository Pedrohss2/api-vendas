import AppError from "@shared/errors/appError";
import { isAfter, addHours } from 'date-fns';
import { hash } from "bcryptjs";
import { IResetPassword } from "../domain/models/IResetPassword";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import { IUserTokenRepository } from "../domain/repositories/IUserTokenRepository";

@injectable()
class ResePasswordService {

  constructor(
     @inject('UserRepository') private userRepository: IUserRepository,
     @inject('IUserTokenRepository') private userTokenRepository: IUserTokenRepository
  ) { }
  
  public async create({ token, password }: IResetPassword): Promise<void> {

    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) throw new AppError('User Token does not exists!');

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) throw new AppError('User does not exists!');
    
    this.validateHours(userToken.created_at);
    
    user.password = await hash(password, 8);

    await this.userRepository.save(user);
  }

  public async validateHours(created_at: Date): Promise<void> {
    const tokenCreatedAt = created_at;

    const compareDate = addHours(tokenCreatedAt, 2);

    isAfter(Date.now(), compareDate) ? new AppError('Token exprired') : null; 
  }
}

export default ResePasswordService;
