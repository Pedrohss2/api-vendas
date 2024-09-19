import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/appError";
import RedisCache from "@shared/cache/RedisCache";

interface IRequest {
  id: string;
}

class DeleteProductService {
  
  public async delete( { id } : IRequest ): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const product = await productsRepository.findOne(id);

    const redisCahce = new RedisCache();

    if (!product) throw new AppError("Product not found!", 404);
  
    await redisCahce.invalidate('api-vendas-PRODUCT_LIST');

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
