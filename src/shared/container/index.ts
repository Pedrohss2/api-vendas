import { container } from "tsyringe";
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import CustomersRepository from "@modules/customers/infra/typeorm/repositories/CustomerRepository";
import { IOrdersRepository } from "@modules/orders/domain/repositories/IOrdersRepository";
import { OrdersRepository } from "@modules/orders/infra/typeorm/repositories/OrdersRepository";
import { IProductRepository } from "@modules/products/domain/repositories/IProductRepository";
import { ProductsRepository } from "@modules/products/infra/typeorm/repositories/ProductsRepository";

container.registerSingleton<ICustomersRepository>('CustomersRepository', CustomersRepository);
container.registerSingleton<IOrdersRepository>('OrdersRepository', OrdersRepository);
container.registerSingleton<IProductRepository>('ProductsRepository', ProductsRepository);



