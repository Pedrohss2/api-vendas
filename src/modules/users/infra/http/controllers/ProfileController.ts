import { Request, Response } from "express";
import ShowProfileService from "../../../services/ShowProfileService";
import UpdateProfileService from "../../../services/UpdateProfileService";
import { instanceToInstance } from 'class-transformer'
import { container } from "tsyringe";

export default class ProfileController {
  
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = container.resolve(ShowProfileService);
    const userId  = request.params.id;

    const user = await showProfile.show({ userId });

    return response.json(instanceToInstance(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateProfile = container.resolve(UpdateProfileService);
    const userId = request.user.id;
    const {name, email, password, oldPassword } = request.body;

    const user = await updateProfile.execute({ userId, name, email, password, oldPassword });

    return response.json(instanceToInstance(user));
  }
}
