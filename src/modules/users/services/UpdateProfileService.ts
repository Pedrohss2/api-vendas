import AppError from "@shared/errors/appError";
import { compare } from "bcryptjs";
import { hash } from "bcryptjs";
import { IUpdateProfile } from "../domain/models/IUpdateProfile";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IUser } from "../domain/models/IUser";

@injectable()
class UpdateProfileService {

  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) { }

  public async execute({ userId, name, email, password, oldPassword }: IUpdateProfile): Promise<IUser> {

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userUpdateEmail = await this.userRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== userId) {
      throw new AppError('There is already one user with this email.');
    }

    if (password && !oldPassword) {
      throw new AppError('Old password is required.');
    }

    if (password && oldPassword) {
      const checkOldPassword = await compare(oldPassword, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
