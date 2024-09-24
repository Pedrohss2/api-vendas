import AppError from "@shared/errors/appError";
import RedisCache from "@shared/cache/RedisCache";
import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../domain/repositories/IProductRepository";
import { IProduct } from "../domain/models/IProduct";

@injectable()
class UpdateProductService {
  
  constructor(
    @inject('ProductsRepository') private productsRepository: IProductRepository
  ) { };

  public async update( { id, name, price, quantity } : IUpdateProduct ): Promise<IProduct | undefined> {
    const productExist = await this.productsRepository.findByName(name);
    const product = await this.productsRepository.findOne(id);

    const redisCahce = new RedisCache();

    if (!product) throw new AppError("Product not found!", 404);
    
    if (productExist && name != product.name) throw new AppError("Product exist!", 404);

    await redisCahce.invalidate('api-vendas-PRODUCT_LIST');

    product.name = name;
    product.price = price;
    product.quantity = quantity;
  
    await this.productsRepository.save(product);
    
    return product;
  }
}

export default UpdateProductService;
