import Product from "../infra/typeorm/entities/Product";
import RedisCache from "@shared/cache/RedisCache";
import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../domain/repositories/IProductRepository";
import { IProduct } from "../domain/models/IProduct";

@injectable()
class ListProductService {
  
  constructor(
    @inject('ProductsRepository') private productsRepository: IProductRepository
  ) { };

  public async list(): Promise<IProduct[]> {
    
    const redisCahce = new RedisCache();

    let product = await redisCahce.recover<IProduct[]>('api-vendas-PRODUCT_LIST');
    
    let products = await this.productsRepository.list();
    
    await redisCahce.save('api-vendas-PRODUCT_LIST', products)

    return products;
  }
}

export default ListProductService;
