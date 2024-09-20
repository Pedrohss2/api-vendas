import AppError from "@shared/errors/appError";
import User from "../infra/typeorm/entities/User";
import UserRepository from "../infra/typeorm/repositories/UserRepository";
import { getCustomRepository } from "typeorm";
import { compare } from 'bcryptjs';
import { Secret, sign } from "jsonwebtoken";
import authConfig from "@config/auth";
import EtherealMail from "@config/mail/EtherealMail";
import path from "path";
 
interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
}

class CreateSessionsService {

  public async create({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);

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

  async sendEmail(token: string, { name, email }: User): Promise<void> {
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
