import AppError from "@shared/errors/appError";
import { getCustomRepository } from "typeorm";
import path from "path";
import UserRepository from "../typeorm/repositories/UserRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import EtherealMail from "@config/mail/EtherealMail";
import User from "../typeorm/entities/User";

interface IRequest {
  email: string;
}


class SendForgotPasswordEmailService {

  public async create({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokneRepository = getCustomRepository(UserTokensRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) throw new AppError('User does not exists!');

    const { token } = await userTokneRepository.generate(user.id);
    
    this.sendEmail(token, user);
  }

  public async sendEmail(token: string, { name, email}: User): Promise<void> {
    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

    await EtherealMail.sendMail({
      to: {
        name: name,
        email: email,
      },
      subject: '[API DE VENSAS]',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: name,
          link: `http://localhost:8080/reset_password?token=${token}`,
        }
      },
    });
  }

}

export default SendForgotPasswordEmailService;
