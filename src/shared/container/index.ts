import { container } from "tsyringe";
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import CustomersRepository from "@modules/customers/infra/typeorm/repositories/CustomerRepository";
import { IOrdersRepository } from "@modules/orders/domain/repositories/IOrdersRepository";
import { OrdersRepository } from "@modules/orders/infra/typeorm/repositories/OrdersRepository";
import { IProductRepository } from "@modules/products/domain/repositories/IProductRepository";
import { ProductsRepository } from "@modules/products/infra/typeorm/repositories/ProductsRepository";
import { IUserRepository } from "@modules/users/domain/repositories/IUserRepository";
import UserRepository from "@modules/users/infra/typeorm/repositories/UserRepository";
import { IUserTokenRepository } from "@modules/users/domain/repositories/IUserTokenRepository";
import UserTokensRepository from "@modules/users/infra/typeorm/repositories/UserTokensRepository";

container.registerSingleton<ICustomersRepository>('CustomersRepository', CustomersRepository);
container.registerSingleton<IOrdersRepository>('OrdersRepository', OrdersRepository);
container.registerSingleton<IProductRepository>('ProductsRepository', ProductsRepository);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IUserTokenRepository>('IUserTokenRepository', UserTokensRepository);




