import AppError from "@shared/errors/appError";
import path from "path";
import EtherealMail from "@config/mail/EtherealMail";
import { ISendMail } from "../domain/models/ISendMail";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IUserTokenRepository } from "../domain/repositories/IUserTokenRepository";
import { IUser } from "../domain/models/IUser";

@injectable()
class SendForgotPasswordEmailService {

  constructor(
     @inject('UserRepository') private userRepository: IUserRepository,
     @inject('IUserTokenRepository') private userTokenRepository: IUserTokenRepository
  ) { }
  
  public async create({ email }: ISendMail): Promise<void> {

    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new AppError('User does not exists!');

    const { token } = await this.userTokenRepository.generate(user.id);
    
    this.sendEmail(token, user);
  }

  public async sendEmail(token: string, { name, email}: IUser): Promise<void> {
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
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        }
      },
    });
  }

}

export default SendForgotPasswordEmailService;
