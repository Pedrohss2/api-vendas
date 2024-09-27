import AppError from "@shared/errors/appError";
import { IShowProfile } from "../domain/models/IShowProfile";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IUser } from "../domain/models/IUser";

@injectable()
class ShowProfileService {

  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) { }
  
  public async show({ userId } :IShowProfile): Promise<IUser |  AppError> {
    const user = await this.userRepository.findById(userId);
    
    if(!user) throw new AppError("User not found!..")
    
    return user;    
  }
}

export default ShowProfileService;
