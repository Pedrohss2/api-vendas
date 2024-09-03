import AppError from "@shared/errors/appError";
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {

  public async create({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokneRepository = getCustomRepository(UserTokensRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) throw new AppError('User does not exists!');

    const token = await userTokneRepository.generate(user.id);

    console.log(token);
  }
}

export default SendForgotPasswordEmailService;
