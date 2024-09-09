import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";
import User from "../typeorm/entities/User";
import AppError from "@shared/errors/appError";
import { compare } from "bcryptjs";
import { hash } from "bcryptjs";

type IRequest = {
  userId: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}


class UpdateProfileService {
  public async execute({ userId, name, email, password, oldPassword }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userUpdateEmail = await usersRepository.findByEmail(email);

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

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
