import User from "@modules/users/infra/typeorm/entities/User";
import { ICreateUser } from "../models/ICreateUser";
import { IUser } from "../models/IUser";

export interface IUserRepository {
  findByName(name: string): Promise<IUser | undefined>;
  findById(id: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  create({ name, email, password }: ICreateUser): Promise<ICreateUser>;
  remove(user: IUser): Promise<void>;
  list(): Promise<IUser[]>;
  save(user: ICreateUser): Promise<ICreateUser>;
}
 