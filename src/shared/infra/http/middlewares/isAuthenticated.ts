import AppError from "@shared/errors/appError";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth"; 
import { override } from "joi";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void {

  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('JWT token is missing!');

  const [, token] = authHeader.split(' ');

  try {
    const secret = authConfig.jwt.secret;

    if (!secret) {
      throw new AppError('JWT secret is missing!');
    }
    
    const decodedToken = verify(token, secret);

    const { sub } = decodedToken as ITokenPayload;
    
    request.user = {
      id: sub,
    }

    return next();
  } catch {
    throw new AppError('Invalid JWT token!')
  }
}
