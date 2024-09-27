import { Request, Response } from "express";
import ResePasswordService from "@modules/users/services/ResetPasswordService";
import { container } from "tsyringe";
import SendForgotPasswordEmailService from "@modules/users/services/SendForgotPasswordEmailService";

export default class ForgotPasswordController {

  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = container.resolve(SendForgotPasswordEmailService);
    
    await sendForgotPasswordEmail.create({ email });

    return response.status(204).json();
  }
}
