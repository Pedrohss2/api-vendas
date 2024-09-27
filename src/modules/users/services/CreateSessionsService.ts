import AppError from "@shared/errors/appError";
import { compare } from 'bcryptjs';
import { Secret, sign } from "jsonwebtoken";
import authConfig from "@config/auth";
import EtherealMail from "@config/mail/EtherealMail";
import path from "path";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IUser } from "../domain/models/IUser";
 
interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
}

@injectable()
class CreateSessionsService {

  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  public async create({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new AppError("Incorrect email/password combination!", 401);
    
    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) throw new AppError("Incorrect email/password combination!", 401);
    
    const token = sign({}, authConfig.jwt.secret as Secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn
    });

    this.sendEmail(token, user);

    return { token };
  }

  async sendEmail(token: string, { name, email }: IUser): Promise<void> {
    const sendMailTemplate = path.resolve(__dirname, '..', 'views', 'authenticated.hbs');
    
    await EtherealMail.sendMail({
      to: {
        name: name,
        email: email,
      },
      subject: '[API DE VENDAS]',
      templateData: {
        file: sendMailTemplate,
        variables: {
          name: name,
        }
      },
    });  
  }
}

export default CreateSessionsService;
