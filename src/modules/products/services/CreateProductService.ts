import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../infra/typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/appError";
import Product from "../infra/typeorm/entities/Product";
import { promises } from "dns";
import RedisCache from "@shared/cache/RedisCache";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {

  public async create({ name, price, quantity }: IRequest): Promise<Product | AppError> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const productExist = await productsRepository.findByName(name);
    
    const redisCahce = new RedisCache();

    if (productExist) throw new AppError("There is already one product with this name!", 404);
    const product = productsRepository.create({
      name, 
      price,
      quantity,
    });

    await redisCahce.invalidate('api-vendas-PRODUCT_LIST');

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
