import { getCustomRepository } from "typeorm";
import User from "../infra/typeorm/entities/User";
import UserRepository from "../infra/typeorm/repositories/UserRepository";
import AppError from "@shared/errors/appError";

interface IRequest {
  userId: string;
}

class ShowProfileService {
  public async list({ userId } :IRequest): Promise<User |  AppError> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(userId);
    
    if(!user) throw new AppError("User not found!..")
    
    return user;    
  }
}

export default ShowProfileService;
