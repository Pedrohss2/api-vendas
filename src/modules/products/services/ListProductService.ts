import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../infra/typeorm/repositories/ProductsRepository";
import Product from "../infra/typeorm/entities/Product";
import RedisCache from "@shared/cache/RedisCache";

interface IPaginateProduct {
  from: number,
  to: number,
  per_page: number,
  total: number,
  current_page: number,
  prev_page: number | null,
  next_page: number | null,
  data: Product[],
}

class ListProductService {
  
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
