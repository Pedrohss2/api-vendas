import AppError from "@shared/errors/appError";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";
import { getCustomRepository } from "typeorm";
import express from "express";
import { hash } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {

  public async create({ name, email, password }: IRequest): Promise<User | AppError> {
    const userRepository = getCustomRepository(UserRepository);
    const emailExist = await userRepository.findByEmail(email);

    const hashedPassword = await hash(password, 8);
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return emailExist ? new AppError("There is already one user with this email!", 404) : user;
  }
}

export default CreateUserService;
