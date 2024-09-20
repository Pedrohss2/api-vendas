import { Request, Response } from "express";
import UpdateUserAvatarService from "../../../services/UpdateUserAvatarService";
import { instanceToInstance } from "class-transformer";

export default class UsersAvatarController {
  
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const user = updateAvatar.create({
      userId: request.user.id,
      avatarFilename: request.file?.filename as string,
    });
    
    return response.json(instanceToInstance(user));
  }
}
