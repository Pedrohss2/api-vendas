import AppError from "@shared/errors/appError";
import { hash } from 'bcryptjs';
import { ICreateUser } from "../domain/models/ICreateUser";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";

@injectable()
class CreateUserService {

  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  public async create({ name, email, password }: ICreateUser): Promise<ICreateUser> {
    const emailExist = await this.userRepository.findByEmail(email);

    if (emailExist) throw new AppError("There is already one user with this email!", 404);

    const hashedPassword = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
