import AppError from '@/common/domain/errors/app-error';
import 'dotenv/config'
import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(8080),
  API_URL: z.string().default('http://localhost:8080'),
});

const _env = envSchema.safeParse(process.env);

if (_env.success == false) { 
  throw new AppError("Invalid enviroment variables")
}

export const env = _env.data;
