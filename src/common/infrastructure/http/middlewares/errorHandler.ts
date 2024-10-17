import AppError from '@/common/domain/errors/app-error';
import {NextFunction, Request, Response } from 'express'

export function erroHandler(error: Error, request: Request, response: Response, next: NextFunction): Response {

  if (error instanceof AppError) {
    return response.status(error.statuscode).json({
      status: 'error',
      message: error.message
    });
  }

  console.log(error);
  
  return response.status(500).json({ message: 'Internal server error' });
}
