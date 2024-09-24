import AppError from "@shared/errors/appError";
import RedisCache from "@shared/cache/RedisCache";
import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../domain/repositories/IProductRepository";
import { IDeleteProduct } from "../domain/models/IDeleteProduct";

@injectable()
class DeleteProductService {
  
   constructor(
    @inject('ProductsRepository') private productsRepository: IProductRepository
  ) { };

  public async delete( { id } : IDeleteProduct ): Promise<void> {
    const product = await this.productsRepository.findOne(id);

    const redisCahce = new RedisCache();

    if (!product) throw new AppError("Product not found!", 404);
  
    await redisCahce.invalidate('api-vendas-PRODUCT_LIST');

    await this.productsRepository.remove(product);
  }
}

export default DeleteProductService;
