import { Request, Response } from 'express'
import CreateSessionsService from '../../../services/CreateSessionsService';
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';
import { instanceToInstance } from 'class-transformer';


export default class SessionsController {
  public async login(request: Request, response: Response): Promise<Response> {

    const { email, password } = request.body;
    const createSession = new CreateSessionsService(); 
    
    const user = await createSession.create({ email, password });

    return response.json(instanceToInstance(user));
  }
}
