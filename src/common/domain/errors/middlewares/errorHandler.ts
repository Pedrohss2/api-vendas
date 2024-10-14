import AppError from "../app.error";
import {NextFunction, Request, Response } from 'express'

export function erroHandler(error: Error, request: Request, response: Response, next: NextFunction) {

  if(error instanceof AppError) {
    return response.status(error.statuscode).json({ message: error.message });
  }

  return response.status(500).json({ message: 'Internal server error'});
}
