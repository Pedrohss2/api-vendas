import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'
import cors from 'cors';
import { errors } from 'celebrate'
import routes from './routes'
import AppError from '@shared/errors/appError';
import '@shared/typeorm';
import { error } from 'console';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errors());

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message, 
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(8080, () => {
  console.log(`App rodando na porta 8080`);
});
