import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../infra/typeorm/repositories/ProductsRepository";
import Product from "../infra/typeorm/entities/Product";
import RedisCache from "@shared/cache/RedisCache";
import { IPaginateProduct } from "../domain/models/IPaginateProduct";
import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../domain/repositories/IProductRepository";

@injectable()
class ListProductService {
  
  constructor(
    @inject('ProductsRepository') private productsRepository: IProductRepository
  ) { };

  public async list(): Promise<IPaginateProduct> {
    const productsRepository = getCustomRepository(ProductsRepository);
    
    const redisCahce = new RedisCache();

    let product = await redisCahce.recover<Product[]>('api-vendas-PRODUCT_LIST');
    let products;
    
    if (!product) {
      products = await productsRepository.createQueryBuilder().paginate();

      await redisCahce.save('api-vendas-PRODUCT_LIST', products)
    }
  
    return products as IPaginateProduct;
  }
}

export default ListProductService;
