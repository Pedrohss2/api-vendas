import { Request, Response } from 'express'
import CreateSessionsService from '../../../services/CreateSessionsService';
import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';


export default class SessionsController {
  public async login(request: Request, response: Response): Promise<Response> {

    const { email, password } = request.body;
    const createSession = container.resolve(CreateSessionsService); 
    
    const user = await createSession.create({ email, password });

    return response.json(instanceToInstance(user));
  }
}
