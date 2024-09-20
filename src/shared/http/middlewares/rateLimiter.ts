import {Request, Response, NextFunction} from 'express'
import { Redis } from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible'
import AppError from '@shared/errors/appError';
import { stringify } from 'querystring';

const redisCliente = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined,
});

const limiter = new RateLimiterRedis({
  storeClient: redisCliente,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1,
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const ip = request.ip;

    if (!ip) throw new AppError("Ip not found");

    await limiter.consume(ip);

    return next();
  }
  catch (error) {
    throw new AppError(`Too many request ${error}. 429`)
  }

}
