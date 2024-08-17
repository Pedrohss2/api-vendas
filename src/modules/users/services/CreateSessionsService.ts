import AppError from "@shared/errors/appError";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";
import { getCustomRepository } from "typeorm";
import express from "express";
import { compare } from 'bcryptjs';
import { sign } from "jsonwebtoken";
 
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
    
    const token = sign({}, "c7e3ef10bdfae756b653a4bcdece8aba", { 
      subject: user.id,
      expiresIn: '1d'
    })

    return { token };
  }
}

export default CreateSessionsService;
