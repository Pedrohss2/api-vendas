import AppError from "@shared/errors/appError";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";
import { getCustomRepository } from "typeorm";
import express from "express";
import path from "path";
import uploadConfig from '@config/upload';
import fs from 'fs';

interface IRequest {
  userId: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {

  public async create({ userId, avatarFilename }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    
    const user = await userRepository.findById(userId);

    if (!user) { throw new AppError('User not found.'); }
  
    if (user.avatar) {
      const userAvataeFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvataeFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvataeFilePath);
      }
    }

    user.avatar = avatarFilename;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
