import AppError from "@shared/errors/appError";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";
import { getCustomRepository } from "typeorm";
import express from "express";
import { compare } from 'bcryptjs';
import { sign } from "jsonwebtoken";
import authConfig from "@config/auth";
 
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
    
    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn
    });

    return { token };
  }
}

export default CreateSessionsService;
