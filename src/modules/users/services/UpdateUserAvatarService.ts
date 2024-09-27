import AppError from "@shared/errors/appError";
import path from "path";
import uploadConfig from '@config/upload';
import fs from 'fs';
import { IUPdateUserAvatar } from "../domain/models/IUpdateUserAvatar";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import { IUser } from "../domain/models/IUser";

@injectable()
class UpdateUserAvatarService {

  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) { }

  public async create({ userId, avatarFilename }: IUPdateUserAvatar): Promise<IUser> {
    
    const user = await this.userRepository.findById(userId);

    if (!user) { throw new AppError('User not found.'); }
  
    if (user.avatar) {
      const userAvataeFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvataeFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvataeFilePath);
      }
    }

    user.avatar = avatarFilename;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
