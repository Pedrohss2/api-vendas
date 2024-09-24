import AppError from "@shared/errors/appError";
import { promises } from "dns";
import RedisCache from "@shared/cache/RedisCache";
import { ICreateProduct } from "../domain/models/ICreateProduct";
import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../domain/repositories/IProductRepository";
import { IProduct } from "../domain/models/IProduct";

@injectable()
class CreateProductService {

  constructor(
    @inject('ProductsRepository') private productsRepository: IProductRepository
  ) { };
  
  public async create({ name, price, quantity }: ICreateProduct): Promise<IProduct | AppError> {
    const productExist = await this.productsRepository.findByName(name);
    
    const redisCahce = new RedisCache();

    if (productExist) throw new AppError("There is already one product with this name!", 404);
    
    const product = await this.productsRepository.create({
      name, 
      price,
      quantity,
    });

    await redisCahce.invalidate('api-vendas-PRODUCT_LIST');

    await this.productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
